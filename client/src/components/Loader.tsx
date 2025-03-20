import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
