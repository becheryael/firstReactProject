import { ReactNode } from "react";
// @ts-ignore
import styles from "./Button.module.css";

interface buttonProps {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Button = (props: buttonProps) => {
  return (
    <button
      className={styles.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
