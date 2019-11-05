import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    /* estamos chamando um método q retorna uma promisse (q é assincrona) por
    isso usamos o call() por volta: primeiro parametro é o método e os demais
    parametros são os param que o método em questao precisa receber:
    url e os dados que queremos enviar.
    a rota sessions é a rota da API para login */
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      // console.tron.error('Usuário não é um prestador!');
      toast.error('Usuário não é um prestador!');
      return;
    }

    /* utilizamos o .defaults para setar infos q vao ser utilizadas em
    TODAS as requisições */
    // api.defaults.headers.['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados!');
  } finally {
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    /* a rota users é a rota da API para criar um usuario */
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });
    toast.success(`Usuário "${name}" cadastrado com sucesso!`);
    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

// esse saga nao tem nada assincrono entao chamamos normalmente
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
