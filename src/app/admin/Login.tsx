"use client";

import { useActionState, useState } from "react";
import { login } from "./actions";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);
  const [show, setShow] = useState(false);

  return (
    <main className="adm-center">
      <form className="adm-card" action={action}>
        <img src="/logo.svg" alt="Uborka Navoiy" width={180} height={51} />
        <h1>Admin panelga kirish</h1>
        <label className="adm-field" htmlFor="adm-password">
          <span>Parol</span>
        </label>
        <div className="adm-pass">
          <input
            id="adm-password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            required
            autoFocus
          />
          <button
            type="button"
            className="adm-pass__toggle"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Parolni yashirish" : "Parolni ko‘rsatish"}
            aria-pressed={show}
            title={show ? "Parolni yashirish" : "Parolni ko‘rsatish"}
          >
            {show ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <path d="M1 1l22 22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {state?.error && <p className="adm-error">{state.error}</p>}
        <button className="adm-btn adm-btn--red" type="submit" disabled={pending}>
          {pending ? "Tekshirilmoqda…" : "Kirish"}
        </button>
      </form>
    </main>
  );
}
