export const analyzeRepository = async (repoUrl: string) => {
  const response = await fetch('http://localhost:3000/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repoUrl }),
  });
  const data = await response.json();
  return data.summary;
};

export const askQuestion = async (repoUrl: string, question: string) => {
  const response = await fetch('http://localhost:3000/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repoUrl, question }),
  });
  const data = await response.json();
  return data.answer;
};