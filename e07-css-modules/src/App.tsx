import { useState } from "react";
import { TextField, type FieldState } from "./components/TextField";
import styles from "./App.module.css";
// TODO 3: import { z } from "zod";
// TODO 3: import { registrationSchema } from "./schemas";

type FormValues = {
  name: string;
  email: string;
  age: string; // z <input type="number"> vždy přichází řetězec
};

type FieldName = keyof FormValues;

export default function App() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    age: "",
  });
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    age: false,
  });

  // TODO 3a: zvalidujte `values` pomocí registrationSchema.safeParse(...)
  // TODO 3b: z výsledku získejte chyby jednotlivých polí (z.flattenError)

  // TODO 3c: upravte tak, aby funkce vracela "idle", "valid" nebo "invalid"
  function getState(field: FieldName): FieldState {
    return touched[field] ? "valid" : "idle";
  }

  const update = (field: FieldName) => (value: string) =>
    setValues((v) => ({ ...v, [field]: value }));

  const blur = (field: FieldName) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  return (
    <main className={styles.page}>
      <form className={styles.card} noValidate>
        <h1 className={styles.title}>Registrace</h1>

        <TextField
          label="Jméno"
          value={values.name}
          state={getState("name")}
          onChange={update("name")}
          onBlur={blur("name")}
        />
        <TextField
          label="E-mail"
          type="email"
          value={values.email}
          state={getState("email")}
          onChange={update("email")}
          onBlur={blur("email")}
        />
        <TextField
          label="Věk"
          type="number"
          value={values.age}
          state={getState("age")}
          onChange={update("age")}
          onBlur={blur("age")}
        />

        {/* TODO 4: tlačítko Registrovat, které je neaktivní, dokud je formulář neplatný */}
      </form>
    </main>
  );
}
