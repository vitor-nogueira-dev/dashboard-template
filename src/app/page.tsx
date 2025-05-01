import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/signin');
};

export default Home;