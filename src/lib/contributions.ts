import { ItsNotABugItsAFeatureError } from "./errors";
import type { ContributionCell } from "../types";

const BROWN_SCALE = ["#2f1b14", "#4a2c1f", "#6b3f2a", "#8a5639", "#a86a47"];

function tooltipFor(commits: number): string {
  if (commits > 12) {
    return "Touch grass, please.";
  }
  return `${commits} questionable commits`;
}

function shadeFor(commits: number): string {
  const index = Math.min(BROWN_SCALE.length - 1, Math.floor(commits / 3));
  return BROWN_SCALE[index];
}

export function generateBrownContributionGraph(days = 119): ContributionCell[] {
  if (days <= 0) {
    throw new ItsNotABugItsAFeatureError("Contribution graph needs at least one day.");
  }

  const now = new Date();
  const grid: ContributionCell[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const commits = Math.floor(Math.random() * 16);
    grid.push({
      date: date.toISOString().slice(0, 10),
      commits,
      color: shadeFor(commits),
      tooltip: tooltipFor(commits),
    });
  }

  return grid;
}
