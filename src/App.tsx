import { FC } from 'react';
import { AppProps } from './interface/interface';
import RoutRoot from './router/routerRoot';

const App: FC<AppProps> = ({ offers, reviews, nearOffers }) => (
  <RoutRoot offers={offers} reviews={reviews} nearOffers={nearOffers} />
);

export default App;
