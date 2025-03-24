import { useState } from "react";
import { askQuestion } from "../api/apiController";

export const useRepoData = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (repoUrl: string, question: string) => {
    setLoading(true);
    const answer = await askQuestion(repoUrl, question);
    setAnswer(answer);
    setQuestion(question);
    setLoading(false);
  };

  return { answer, question, loading, handleAsk };
};
