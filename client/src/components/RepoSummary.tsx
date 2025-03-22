import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';

interface RepoSummaryProps {
  title: string;
  content: React.ReactNode;
}

const RepoSummary: React.FC<RepoSummaryProps> = ({ title, content }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, m: 1, width: '45%' }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Divider/>
      <Box mt={2}>
        {content}
      </Box>
    </Paper>
  );
};

export default RepoSummary;