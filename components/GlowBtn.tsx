import { GlowEffect } from "@/components/ui/glow-effect";

export function GlowEffectButton({
  children,
  show = true,
  className,
}: {
  children: React.ReactNode;
  show?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className} `}>
      <GlowEffect
        className={`${
          show ? "opacity-100" : "opacity-0"
        } transition-all duration-500 ease-in-out`}
        colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
        mode="colorShift"
        blur="medium"
        duration={3}
      />
      {children}
    </div>
  );
}
