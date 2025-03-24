import { useState } from "react";
import { analyzeRepository } from "../api/apiController";

export const useRepoData = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (repoUrl: string) => {
    setLoading(true);
    const summary = await analyzeRepository(repoUrl);
    setSummary(summary);
    setLoading(false);
  };

  return { summary, loading, handleAnalyze };
};
