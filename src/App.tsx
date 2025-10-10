import { FC } from 'react';
import { MainPageProps } from './interface/interrface';
import RoutRoot from './router/routerRoot';

const App: FC<MainPageProps> = ({ offerCount }) => (
  <RoutRoot offerCount={offerCount} />
);

export default App;
