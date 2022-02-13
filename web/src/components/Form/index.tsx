import * as React from "react";
import { useState } from "react";

type InitialState<T = any> = T;
type Validator<T = any> = (data: T) => boolean;

export const useForm = (
  initialState: InitialState = {},
  validator: Validator = () => true
) => {
  const [state, setState] = useState(initialState);
  const isValid = validator(state);

  const setValue = (prop: string, value: any) =>
    setState({ ...state, [prop]: value });

  const setOnChangeValue = (prop: string) => (ev: { target: { value: any } }) =>
    setValue(prop, ev.target.value);

  const getValue = (prop: string) => state[prop];
  const getData = () => ({ ...state });

  return {
    isValid,
    getValue,
    setValue,
    getData,
    setOnChangeValue,
  };
};
