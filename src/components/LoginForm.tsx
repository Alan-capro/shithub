import { useState, type FormEvent } from "react";

export interface LoginFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export function LoginForm({ onSuccess, onClose }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!identifier.trim() || !password.trim()) {
      setError("Please fill in both fields before logging in.");
      return;
    }

    try {
      setLoading(true);

      // TODO: Replace this mock with a real API call once the backend is ready.
      // Example:
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ identifier, password, remember }),
      // });
      // if (!res.ok) throw new Error("Login failed");

      await new Promise((resolve) => setTimeout(resolve, 800));

      window.alert(
        `Pretend login succeeded for "${identifier}". Backend wiring coming soon.`,
      );

      if (onSuccess) onSuccess();
    } catch (e) {
      console.error(e);
      setError("Login failed. The auth server is probably also on fire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-sludge-700 bg-sludge-900/95 p-6 shadow-2xl shadow-black/60">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-2 py-1 text-xs text-[#c4b2a3] hover:bg-sludge-800"
        >
          ✕
        </button>
      )}
      <h2 className="mb-2 text-xl font-bold tracking-tight">Sign in to Shithub</h2>
      <p className="mb-6 text-sm text-[#b39d8c]">
        Purely front-end for now. We&apos;ll pretend to trust your credentials.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-left">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#bca997]">
            Username or email
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="octocat@shithub.fake"
            className="w-full rounded-md border border-sludge-700 bg-sludge-800 px-3 py-2 text-sm text-[#f8ece0] outline-none placeholder:text-[#8f7b6b] focus:border-sludge-500"
          />
        </div>

        <div className="text-left">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#bca997]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-sludge-700 bg-sludge-800 px-3 py-2 text-sm text-[#f8ece0] outline-none placeholder:text-[#8f7b6b] focus:border-sludge-500"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#c4b2a3]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-sludge-700 bg-sludge-800 text-sludge-500"
            />
            <span>Remember me on this trash fire</span>
          </label>
          <button
            type="button"
            className="text-[0.7rem] font-semibold text-sludge-300 hover:text-sludge-100"
            onClick={() =>
              window.alert("Password reset is currently implemented as screaming.")
            }
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p className="text-xs text-[#f5a28b]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-md bg-sludge-500 px-4 py-2 text-sm font-semibold text-[#f8ece0] transition hover:bg-[#9f6547] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging you in..." : "Log in"}
        </button>
      </form>
      <p className="mt-4 text-center text-[0.7rem] text-[#8f7b6b]">
        Backend API hook will go here once you&apos;re ready to connect it.
      </p>
    </div>
  );
}


