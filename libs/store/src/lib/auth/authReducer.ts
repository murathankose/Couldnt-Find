import { loginAsync } from '../DTO/LoginDTO';
import { registerAsync } from '../DTO/RegisterDTO';


const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginAsync.success:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case loginAsync.failure:
    case registerAsync.failure:
      return {
        ...state,
        error: action.payload,
      };
    /*case types.LOG_OUT:
      return INITIAL_STATE;*/
    default:
      return state;
  }
};

export default authReducer;
