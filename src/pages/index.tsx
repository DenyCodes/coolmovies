import type { NextPage } from 'next';
import { Example } from '../features/example/';
import ReviewForm from '../features/example/templates/ReviewForm';
import ReviewsList from '../features/example/templates/ReviewsList';

const Home: NextPage = () => {
  return (<> <ReviewForm />
         <ReviewsList />
         </>) 
};

export default Home;
