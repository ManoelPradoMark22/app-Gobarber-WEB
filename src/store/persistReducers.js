import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage,
      whitelist: [
        'auth',
        'user',
      ] /* coloque APENAS os nomes dos reducers q vc precisa armazenar E PERSISTIR
    informacoes   */,
    },
    reducers
  );

  return persistedReducer;
};
