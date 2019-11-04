import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      /* por mais que estejamos no modulo user (e nao auth), podemos sim
      escutar a action @auth/SIGN_IN_SUCCESS */
      return produce(state, draft => {
        draft.profile =
          action.payload.user; /* pegando a variavel user
        que esta sendo passada por @auth/SIGN_IN_SUCCESS */
      });
    default:
      return state;
  }
}
