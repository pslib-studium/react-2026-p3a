import { useId } from "react";
import styles from "./TextField.module.css";

export type FieldState = "idle" | "valid" | "invalid";

type Props = {
  label: string;
  value: string;
  state: FieldState;
  error?: string;
  type?: "text" | "email" | "number" | "password";
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function TextField({
  label,
  value,
  state,
  error,
  type = "text",
  onChange,
  onBlur,
}: Props) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={styles.field} data-state={state}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        aria-invalid={state === "invalid"}
        aria-describedby={state === "invalid" ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      <p id={errorId} className={styles.message}>
        {state === "invalid" ? error : ""}
      </p>
    </div>
  );
}
