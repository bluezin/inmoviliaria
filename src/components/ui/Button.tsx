import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsLink extends SharedProps {
  href: string;
  anchorProps?: Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "href" | "className"
  >;
}

interface ButtonAsButton extends SharedProps {
  href?: undefined;
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className"
  >;
}

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", fullWidth = false, className = "" } = props;

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} {...props.anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props.buttonProps}>
      {children}
    </button>
  );
}