import { tempActions, TempStore } from "./types";
import { getType } from "typesafe-actions";
import { captchaRequired } from "./actions";

const initialState: Partial<TempStore> = { captchaRequired: false };

export function tempReducer(state = initialState, action: tempActions): Partial<TempStore> {
  switch (action.type) {
    case getType(captchaRequired):
      return { ...state, captchaRequired: action.payload };
  }

  return state;
}
