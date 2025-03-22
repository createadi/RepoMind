import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RepoInput from './components/RepoInput';
import RepoSummary from './components/RepoSummary';
import Loader from './components/Loader';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

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
    <>
      <Header />
      <Box sx={{ p: 2, mt: 8 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" fontWeight={900} gutterBottom>
          AI-Powered Git Repo Insights
          </Typography>
          <Typography variant="body1" color='#696969' maxWidth={600} gutterBottom>
          An AI-driven platform that summarizes Git repositories and provides code explanations, enabling faster understanding and insights for developers.
          </Typography>
          {loading ? (
            <Loader />
          ) : (
            <Box minWidth={600}>
              <RepoInput onAnalyze={handleAnalyze} onAsk={handleAsk} />
              <RepoSummary summary={summary} answer={answer} />
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default App;