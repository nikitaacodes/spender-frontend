import React from "react";

import useTheme from "../../context/useTheme.js";
const Lock = ({
  keyValue,
  password,
  onKeyChange,
  onPasswordChange,
  onUnlock,
  isSubmitting,
  sessionExpired,
  error,
}) => {
  const { dark, setDark } = useTheme();
  const shellClassName = dark
    ? "absolute inset-0 flex flex-col items-center justify-center gap-8 bg-slate-950/70 text-white backdrop-blur-sm"
    : "absolute inset-0 flex flex-col items-center justify-center gap-8 bg-white/55 text-slate-950 backdrop-blur-sm";

  const cardClassName = dark
    ? "w-[320px] rounded-2xl border border-white/10 bg-slate-900 p-6 text-center shadow-xl shadow-black/30"
    : "w-[320px] rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-300/50";

  const inputClassName = dark
    ? "mb-3 w-full rounded-3xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none placeholder:text-slate-400"
    : "mb-3 w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-2 text-slate-900 outline-none placeholder:text-slate-500";

  const passwordClassName = dark
    ? "mb-4 w-full rounded-3xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none placeholder:text-slate-400"
    : "mb-4 w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-2 text-slate-900 outline-none placeholder:text-slate-500";

  const helperTextClassName = dark
    ? "text-sm text-slate-300"
    : "text-sm text-slate-600";

  return (
    <div className={shellClassName}>
      <button
        type="button"
        className="rounded-full border border-white/15 bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:scale-[1.02]"
        onClick={() => setDark(!dark)}
      >
        {dark ? "Light mode" : "Dark mode"}
      </button>
      <div className={cardClassName}>
        <h2 className="pb-5 text-[28px] font-semibold">Sign in to Dashboard</h2>

        {sessionExpired ? (
          <p className="mb-4 rounded-2xl bg-red-500/10 px-4 py-2 text-sm text-red-200">
            Your session expired. Please sign in again.
          </p>
        ) : null}

        {error ? (
          <p className="mb-4 rounded-2xl bg-red-500/10 px-4 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <input
          type="text"
          placeholder="Key"
          value={keyValue}
          onChange={(e) => onKeyChange(e.target.value)}
          className={inputClassName}
        />

        <input
          type="password"
          placeholder="Passcode"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className={passwordClassName}
        />

        <button
          className="w-full rounded-3xl bg-amber-500 py-2 font-medium text-black transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onUnlock}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <div className={`text-center ${helperTextClassName}`}>
        <p>To access dashboard:</p>
        <p>
          • Hit <code>/start</code> to get your key
        </p>
        <p>
          • Hit <code>/pass your_passcode</code>
        </p>
        <p>• Session expires automatically after 1 hour</p>
      </div>
    </div>
  );
};

export default Lock;
