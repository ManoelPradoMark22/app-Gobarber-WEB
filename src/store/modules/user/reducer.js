import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        /* por mais que estejamos no modulo user (e nao auth), podemos sim
      escutar a action @auth/SIGN_IN_SUCCESS */
        draft.profile =
          action.payload.user; /* pegando a variavel user
      que esta sendo passada por @auth/SIGN_IN_SUCCESS */
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
