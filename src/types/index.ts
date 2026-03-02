export type Repo = {
  name: string;
  description: string;
  top_language: string;
  stats: {
    facepalms: string;
    spoons: number;
    regrets: string;
  };
  last_update: string;
};

export type ContributionCell = {
  date: string;
  commits: number;
  color: string;
  tooltip: string;
};
