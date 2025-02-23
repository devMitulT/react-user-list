import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import { UsersProvider } from './context';
import { Provider } from 'react-redux';

import State from './pages/State';
import ContextAPI from './pages/ContextAPI';
import Redux from './pages/Redux';
import Home from './components/Home';

function App() {
  return (
    <Provider store={store}>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/state' element={<State />} />
            <Route path='/contextAPI' element={<ContextAPI />} />
            <Route path='/redux' element={<Redux />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </Provider>
  );
}

export default App;
