import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RepoSummaryProps {
  summary: string;
  answer: string;
}

const RepoSummary: React.FC<RepoSummaryProps> = ({ summary, answer }) => {
  return (
    <Box mt={4}>
      {summary && (
        <>
          <Typography variant="h5">Repository Summary</Typography>
          <Typography variant="body1">{summary}</Typography>
        </>
      )}
      {answer && (
        <>
          <Typography variant="h5">Answer</Typography>
          <Typography variant="body1">{answer}</Typography>
        </>
      )}
    </Box>
  );
};

export default RepoSummary;
