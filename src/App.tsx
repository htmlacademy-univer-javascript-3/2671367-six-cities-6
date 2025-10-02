import { FC } from 'react';
import MainPage from './pages/mainPage';
import { MainPageProps } from './interface/interrface';

const App: FC<MainPageProps> = ({ offerCount }) => (
  <MainPage offerCount={offerCount} />
);

export default App;
