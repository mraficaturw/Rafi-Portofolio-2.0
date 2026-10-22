import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      © {currentYear} Rafi Portofolio 2.0. All rights reserved.
    </footer>
  );
}
