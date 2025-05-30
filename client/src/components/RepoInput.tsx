import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { RepoInputProps } from "../types";

const RepoInput: React.FC<RepoInputProps> = ({
  onSummarize,
  onAsk,
  loading,
}) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState("");

  const handleSummarize = () => {
    if (!repoUrl) {
      setError("Repository URL is required");
      return;
    }
    setError("");
    onSummarize(repoUrl);
  };

  const handleAsk = () => {
    if (!repoUrl || !question) {
      setError("Both repoUrl and question are required");
      return;
    }
    setError("");
    onAsk(repoUrl, question);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setError("");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Summarize" sx={{ minWidth: "250px" }} />
        <Tab label="Ask" sx={{ minWidth: "250px" }} />
      </Tabs>
      <TextField
        label="Repository Link"
        variant="outlined"
        value={repoUrl}
        sx={{ minWidth: "500px", marginTop: 2 }}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      {tabIndex === 1 && (
        <TextField
          label="Question"
          variant="outlined"
          value={question}
          sx={{ minWidth: "500px" }}
          onChange={(e) => setQuestion(e.target.value)}
        />
      )}
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={tabIndex === 0 ? handleSummarize : handleAsk}
        >
          {tabIndex === 0 ? "Summarize" : "Ask"}
        </Button>
      )}
    </Box>
  );
};

export default RepoInput;
