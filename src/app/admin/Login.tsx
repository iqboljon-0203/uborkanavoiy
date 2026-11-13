"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <main className="adm-center">
      <form className="adm-card" action={action}>
        <img src="/logo.svg" alt="Uborka Navoiy" width={180} height={51} />
        <h1>Admin panelga kirish</h1>
        <label className="adm-field">
          <span>Parol</span>
          <input name="password" type="password" autoComplete="current-password" required autoFocus />
        </label>
        {state?.error && <p className="adm-error">{state.error}</p>}
        <button className="adm-btn adm-btn--red" type="submit" disabled={pending}>
          {pending ? "Tekshirilmoqda…" : "Kirish"}
        </button>
      </form>
    </main>
  );
}
