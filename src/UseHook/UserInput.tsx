import React, { useReducer } from "react";

type State = {
  value: string;
  isTourched: boolean; // ✅ 너 기존 철자 유지 (다른 데서 이 이름 쓰면 그대로)
};

type Action =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" };

const initialState: State = {
  value: "",
  isTourched: false,
};

function InputReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INPUT":
      return { ...state, value: action.value };
    case "BLUR":
      return { ...state, isTourched: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// ✅ Hook 이름은 반드시 use로 시작
function useHook(validdateValue: (inputState: string) => boolean) {
  const [inputState, dispatch] = useReducer(InputReducer, initialState);

  const valueValid = validdateValue(inputState.value);
  const hassError = !valueValid && inputState.isTourched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const ResetValue = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hassError,
    isValid: valueValid,
    valueChangeHandler,
    inputBlurHandler,
    ResetValue,
  };
}

export default useHook;