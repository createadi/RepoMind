import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { RepoOutputProps } from "../types";

const RepoOutput: React.FC<RepoOutputProps> = ({ title, content }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, m: 1, width: "45%", textAlign: "left" }}>
      <Typography variant="h5" fontSize={20} fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Box
        display="flex"
        flexWrap="wrap"
        mt={2}
        sx={{ overflowWrap: "break-word" }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
    </Paper>
  );
};

export default RepoOutput;
