export type RepoOutputProps = {
  title: string;
  content: string;
};

export type RepoInputProps = {
  onSummarize: (repoUrl: string) => void;
  onAsk: (repoUrl: string, question: string) => void;
  loading: boolean;
};
