import { FC } from 'react';
import { MainPageProps } from './interface/interface';
import RoutRoot from './router/routerRoot';

const App: FC<MainPageProps> = ({ offers }) => <RoutRoot offers={offers} />;

export default App;
