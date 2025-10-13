export default function Chip({
  children,
  active = false,
  onClick,
  as = "span",
  href,
  className = "",
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  as?: "span" | "button" | "a";
  href?: string;
  className?: string;
}) {
  // Defensive skip for empty or invisible labels
  if (
    !children ||
    (typeof children === "string" &&
      !children.replace(/[\u200B-\u200D\u2060\uFEFF]/g, "").trim())
  ) {
    return null;
  }

  const Comp: any = as;

  return (
    <Comp
      {...(href ? { href } : {})}
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs transition",
        "border",
        active
          ? "border-white/30 bg-white/[0.10] text-white"
          : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]",
        className,
      ].join(" ")}
    >
      {children}
    </Comp>
  );
}
