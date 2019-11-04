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
    url e os dados que queremos enviar */
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

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados!');
  } finally {
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
