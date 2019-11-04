import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
/* o PersistGate vai basicamente renderizar o conteudo que ele esta englobando
SOMENTE depois de ele ter buscado as informacoes dentro do storage da aplicacao */
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store'; // deve vir depois da importacao do reactotron
/* importamos o store e o persistor (pq agr nao ta sendo exportado como default),
já q no arquivo src/store/index.js ta exportando { store, persistor }.
podemos importar apenas um se quisermos (mas ainda entre chaves), mas vamos
utilzar ambos aqui */

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
