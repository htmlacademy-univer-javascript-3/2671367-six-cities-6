import { useEffect } from 'react';
import { checkAuth } from '../entities/user/data/check-user-auth';
import { useAppDispatch } from '../shared/hooks/app-hooks';
import RoutRoot from './providers/router/router-root';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <RoutRoot />;
};

export default App;
