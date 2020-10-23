import { tempActions, TempStore } from "./types";
import { getType } from "typesafe-actions";
import { captchaRequired, errorRequired } from './actions';

const initialState: Partial<TempStore> = { captchaRequired: false,errorRequired:null };

export function tempReducer(state = initialState, action: tempActions): Partial<TempStore> {
  switch (action.type) {
    case getType(captchaRequired):
      return { ...state, captchaRequired: action.payload };
    case getType(errorRequired):
      return { ...state, errorRequired: action.payload };
  }

  return state;
}
