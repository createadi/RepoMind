import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RepoInput from "./components/RepoInput";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RepoOutput from "./components/RepoOutput";

function App() {
  const [summary, setSummary] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [question, setQuestion] = useState("");

  const handleSummarize = async (repoUrl: string) => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    });
    const data = await response.json();
    setSummary(data.summary);
    const repoName = repoUrl.split("/").pop();
    setRepoName(repoName ? repoName.replace(".git", "") : "");
    setLoading(false);
  };

  const handleAsk = async (repoUrl: string, question: string) => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl, question }),
    });
    const data = await response.json();
    setAnswer(data.answer);
    const repoName = repoUrl.split("/").pop();
    setRepoName(repoName ? repoName.replace(".git", "") : "");
    setQuestion(question);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 1, mt: 5 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginBottom={5}
        >
          <Typography variant="h3" fontWeight={900} gutterBottom>
            AI-Powered Git Repo Insights
          </Typography>
          <Typography
            variant="body1"
            color="#696969"
            maxWidth={600}
            marginTop={3}
            marginBottom={5}
            gutterBottom
          >
            An AI-driven platform that summarizes Git repositories and provides
            code explanations, enabling faster understanding and insights for
            developers.
          </Typography>
          <Box minWidth={600}>
            <RepoInput
              onSummarize={handleSummarize}
              onAsk={handleAsk}
              loading={loading}
            />
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent={summary && answer ? "space-between" : "center"}
              mt={4}
            >
              {summary && (
                <RepoOutput
                  title={`Overview of Git Repository: ${repoName}`}
                  content={summary}
                />
              )}
              {answer && (
                <RepoOutput
                  title={`Question asked: ${question}`}
                  content={answer}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default App;
