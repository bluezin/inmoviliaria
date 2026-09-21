import type { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main";
  className?: string;
}

export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  const classes = [styles.container, className].filter(Boolean).join(" ");
  return <Tag className={classes}>{children}</Tag>;
}