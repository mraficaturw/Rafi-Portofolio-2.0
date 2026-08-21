import ColorBends from '../ui/ColorBends/ColorBends';

export default function PersistentBackground() {
  return (
    <div id="persistent-bg" aria-hidden="true">
      <ColorBends
        colors={["#1b2f33", "#1b2e33", "#1b2e39"]}
        rotation={90}
        speed={0.66}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        noise={0.05}
        parallax={0.5}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        transparent={true}
        autoRotate={0}
        color="#7b7283"
      />
    </div>
  );
}
