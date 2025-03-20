import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RepoInput from './components/RepoInput';
import RepoSummary from './components/RepoSummary';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [summary, setSummary] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (repoUrl: string) => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl }),
    });
    const data = await response.json();
    setSummary(data.summary);
    setLoading(false);
  };

  const handleAsk = async (repoUrl: string, question: string) => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl, question }),
    });
    const data = await response.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h3" gutterBottom>
        RepoMind
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RepoInput onAnalyze={handleAnalyze} onAsk={handleAsk} />
          <RepoSummary summary={summary} answer={answer} />
        </>
      )}
    </Box>
  );
}

export default App;