import * as React from "react";

type CommonProps = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

// Three precise variants so we don't need `any`
type SpanChipProps = CommonProps & {
  as?: "span";
  href?: never;
  onClick?: never;
};

type ButtonChipProps = CommonProps & {
  as: "button";
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type AnchorChipProps = CommonProps & {
  as: "a";
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ChipProps = SpanChipProps | ButtonChipProps | AnchorChipProps;

export default function Chip(props: ChipProps): JSX.Element | null {
  const {
    children,
    active = false,
    className = "",
  } = props;

  // Defensive skip for empty or invisible labels
  if (
    !children ||
    (typeof children === "string" &&
      !children.replace(/[\u200B-\u200D\u2060\uFEFF]/g, "").trim())
  ) {
    return null;
    }

  const baseClass = [
    "inline-flex items-center rounded-full px-3 py-1 text-xs transition border",
    active
      ? "border-white/30 bg-white/[0.10] text-white"
      : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]",
    className,
  ].join(" ");

  // Render by variant (keeps types strict, no `any`)
  if (props.as === "button") {
    const { onClick } = props;
    return (
      <button type="button" onClick={onClick} className={baseClass}>
        {children}
      </button>
    );
  }

  if (props.as === "a") {
    const { href, onClick } = props;
    return (
      <a href={href} onClick={onClick} className={baseClass}>
        {children}
      </a>
    );
  }

  // default: span
  return <span className={baseClass}>{children}</span>;
}
