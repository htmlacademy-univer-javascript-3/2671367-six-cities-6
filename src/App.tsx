import { FC } from 'react';
import { AppProps } from './interface/interface';
import RoutRoot from './router/routerRoot';

const App: FC<AppProps> = ({ offers, reviews }) => (
  <RoutRoot offers={offers} reviews={reviews} />
);

export default App;
