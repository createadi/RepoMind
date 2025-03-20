import { useState } from 'react';
import { analyzeRepository, askQuestion } from '../apiController';

export const useRepoData = () => {
  const [summary, setSummary] = useState('');
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState(''); // Add question state
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (repoUrl: string) => {
    setLoading(true);
    const summary = await analyzeRepository(repoUrl);
    setSummary(summary);
    setLoading(false);
  };

  const handleAsk = async (repoUrl: string, question: string) => {
    setLoading(true);
    const answer = await askQuestion(repoUrl, question);
    setAnswer(answer);
    setQuestion(question); // Set the question state
    setLoading(false);
  };

  return { summary, answer, question, loading, handleAnalyze, handleAsk };
};
