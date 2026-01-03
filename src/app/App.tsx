import { useEffect } from 'react';
import { checkAuth } from '../entities/user/data/checkUserAuth';
import { useAppDispatch } from '../shared/hooks/appHooks';
import RoutRoot from './providers/router/router_root';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <RoutRoot />;
};

export default App;
