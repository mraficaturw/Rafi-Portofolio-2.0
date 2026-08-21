import { useState, useEffect, useRef } from "react";
import { auth, loginWithGoogle, logout } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  subscribeToMessages,
  sendChatMessage,
  formatMessageTime,
} from "../../../services/chatService";
import { MAX_MESSAGE_LENGTH } from "../../../constants";
import "./ChatRoom.css";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Listen to messages in real-time
  useEffect(() => {
    return subscribeToMessages(setMessages);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmed = newMessage.trim();
    if (!trimmed || !user || isSending) return;
    if (trimmed.length > MAX_MESSAGE_LENGTH) return;

    setIsSending(true);
    setNewMessage("");

    try {
      await sendChatMessage({
        text: trimmed,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Failed to send message:", error.message);
      setNewMessage(trimmed); // restore on failure
    } finally {
      setIsSending(false);
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  if (authLoading) {
    return (
      <div className="chatroom-card">
        <div className="chatroom-loading">
          <div className="chatroom-spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chatroom-card">
      {/* Top highlight */}
      <div className="chatroom-highlight" />

      {/* Header */}
      <div className="chatroom-header">
        <div className="chatroom-header-left">
          <h3 className="chatroom-title">💬 Chat Room</h3>
          <span className="chatroom-badge">
            {messages.length} messages
          </span>
        </div>

        {user ? (
          <div className="chatroom-user-info">
            <div className="chatroom-avatar-wrapper">
              <img
                src={user.photoURL || ""}
                alt={user.displayName || "User"}
                className="chatroom-avatar"
                referrerPolicy="no-referrer"
              />
              <span className="chatroom-online-dot" />
            </div>
            <button
              type="button"
              className="chatroom-btn-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="chatroom-btn-login"
            onClick={handleLogin}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="chatroom-messages chat-scrollbar" ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className="chatroom-empty">
            <span className="chatroom-empty-icon">💭</span>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = user && msg.uid === user.uid;
            return (
              <div
                key={msg.id}
                className={`chatroom-message ${isOwn ? "own" : "other"}`}
              >
                {!isOwn && (
                  <img
                    src={msg.photoURL || ""}
                    alt={msg.displayName || "User"}
                    className="chatroom-msg-avatar"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="chatroom-msg-content">
                  <div className="chatroom-msg-meta">
                    <span className="chatroom-msg-name">
                      {msg.displayName || "Anonymous"}
                    </span>
                    <span className="chatroom-msg-time">
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`chatroom-msg-bubble ${isOwn ? "own" : "other"}`}
                  >
                    {msg.text}
                  </div>
                </div>
                {isOwn && (
                  <img
                    src={msg.photoURL || ""}
                    alt={msg.displayName || "User"}
                    className="chatroom-msg-avatar"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator (cosmetic — shown briefly after sending) */}
      {isSending && (
        <div className="chatroom-typing">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      )}

      {/* Input area */}
      {user ? (
        <form className="chatroom-input-area" onSubmit={handleSendMessage}>
          <div className="chatroom-input-wrapper">
            <input
              type="text"
              className="chatroom-input"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              disabled={isSending}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="chatroom-btn-send"
            disabled={!newMessage.trim() || isSending}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      ) : (
        <div className="chatroom-login-prompt">
          <p>Sign in with Google to join the conversation</p>
        </div>
      )}
    </div>
  );
}
