import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Typography variant='h3'>Home Page</Typography>
      <Typography variant='h4'>
        <Link to='/state'>State</Link>
      </Typography>
      <Typography variant='h4'>
        <Link to='/contextAPI'>ContextAPI</Link>
      </Typography>
      <Typography variant='h4'>
        <Link to='/redux'>Redux</Link>
      </Typography>
    </div>
  );
};

export default Home;
