import { useMemo, useState, type MouseEvent } from "react";
import { parodyRepos } from "../data/repos";
import { generateBrownContributionGraph } from "../lib/contributions";
import {
  calculateRunawayMergePosition,
  maybeAskPhilosophicalQuestion,
  randomShithubStatusCode,
} from "../lib/pullRequest";
import { LoginForm } from "./LoginForm";

export function ShithubLanding() {
  const contributions = useMemo(() => generateBrownContributionGraph(), []);
  const [mergePos, setMergePos] = useState({ x: 0, y: 0 });
  const [mergeEnabled, setMergeEnabled] = useState(false);
   const [showLogin, setShowLogin] = useState(false);

  const handleMergeMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const next = calculateRunawayMergePosition(
      event.clientX,
      event.clientY,
      rect.left,
      rect.top,
    );

    setMergePos({ x: next.x - rect.left, y: next.y - rect.top });
    const question = maybeAskPhilosophicalQuestion();
    if (question) {
      window.alert(question);
      setMergeEnabled(false);
      return;
    }
    setMergeEnabled(true);
  };

  const attemptMerge = () => {
    if (!mergeEnabled) {
      window.alert("Merge denied: existential checks still running.");
      return;
    }

    const status = randomShithubStatusCode();
    window.alert(`Merge succeeded-ish. Server replied with ${status}.`);
    setMergeEnabled(false);
    setMergePos({ x: 0, y: 0 });
  };

  return (
    <main className="min-h-screen bg-sludge-950 text-[#d6c8bd]">
      <header className="border-b border-sludge-700 bg-sludge-900/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <div className="glitch text-2xl font-black tracking-tight" data-text="Shithub">
            <span className="mr-2">😎🐙🪏</span>
            Shithub
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <input
              placeholder="Search for garbage..."
              className="w-full max-w-xs rounded-md border border-sludge-700 bg-sludge-800 px-3 py-2 text-sm outline-none ring-0 placeholder:text-[#b39d8c] focus:border-sludge-500"
            />
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="rounded-md bg-sludge-600 px-4 py-2 text-sm font-semibold text-[#f8ece0] hover:bg-sludge-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center">
        <div className="mb-4 rounded-full border border-sludge-700 bg-sludge-900 px-4 py-1 text-xs uppercase tracking-widest text-[#b39d8c]">
          Octo-Poop Labs
        </div>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Where bugs become features</h1>
        <p className="mt-4 max-w-2xl text-[#bca997]">
          Looks familiar at first glance, then everything goes mildly, confidently wrong.
        </p>
        <button
          type="button"
          onClick={() => setShowLogin(true)}
          className="mt-8 rounded-lg bg-sludge-500 px-6 py-3 text-base font-bold text-[#f8ece0] shadow-lg shadow-[#00000066] transition hover:translate-y-0.5 hover:bg-[#9f6547]"
        >
          Start Shitting
        </button>

        {showLogin && (
          <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <LoginForm
              onSuccess={() => setShowLogin(false)}
              onClose={() => setShowLogin(false)}
            />
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <h2 className="mb-4 text-xl font-bold">Contribution Swamp</h2>
        <div className="grid grid-cols-[repeat(17,minmax(0,1fr))] gap-1 rounded-lg border border-sludge-700 bg-sludge-900 p-4">
          {contributions.map((cell) => (
            <div
              key={cell.date}
              title={`${cell.date}: ${cell.tooltip}`}
              className="aspect-square rounded-sm border border-black/10"
              style={{ backgroundColor: cell.color }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <h2 className="mb-4 text-xl font-bold">Trending Disasters</h2>
        <div className="space-y-4">
          {parodyRepos.map((repo) => (
            <article
              key={repo.name}
              className="rounded-lg border border-sludge-700 bg-sludge-900 p-4 transition hover:border-sludge-500"
            >
              <h3 className="text-lg font-semibold">{repo.name}</h3>
              <p className="mt-1 text-sm text-[#c4b2a3]">{repo.description}</p>
              <p className="mt-2 text-xs text-[#a88f7a]">Top language: {repo.top_language}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <span>🤦 Facepalms: {repo.stats.facepalms}</span>
                <span>🥄 Spoons: {repo.stats.spoons}</span>
                <span>💀 Regrets: {repo.stats.regrets}</span>
              </div>
              <p className="mt-2 text-xs text-[#8f7b6b]">Updated: {repo.last_update}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <h2 className="mb-4 text-xl font-bold">Pull Request Simulator</h2>
        <div className="rounded-lg border border-sludge-700 bg-sludge-900 p-5">
          <p className="mb-4 text-sm text-[#c4b2a3]">
            Hover the merge button. If it trusts your intentions, maybe it stays still.
          </p>
          <div className="relative h-24 overflow-hidden rounded border border-sludge-700 bg-sludge-800">
            <button
              type="button"
              onMouseEnter={handleMergeMouseEnter}
              onClick={attemptMerge}
              className="absolute left-6 top-6 rounded-md bg-[#24553a] px-4 py-2 font-semibold text-[#d6f3e3] transition"
              style={{ transform: `translate(${mergePos.x}px, ${mergePos.y}px)` }}
            >
              Merge
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
