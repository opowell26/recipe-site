import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>My Recipe Site</h1>
      <Outlet />
    </div>
  );
};

export default Home;
