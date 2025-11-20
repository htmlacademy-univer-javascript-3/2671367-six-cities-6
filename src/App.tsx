import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initData } from './store/action';
import RoutRoot from './router/routerRoot';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initData());
  }, [dispatch]);

  return <RoutRoot />;
};

export default App;
