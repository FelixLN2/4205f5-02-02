import React, { useReducer, useEffect } from 'react';

import { validate } from "../../util/validators"
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    case 'SET_VALIDITY':
      return {
        ...state,
        isValid: action.isValid
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
    dispatch({ type: 'SET_VALIDITY', isValid: isValid });
  }, [id, value, isValid, onInput]);  

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === 'textarea' ?(
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === 'select1' ? (
    <select
      id={props.id}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    >
      <option value=""></option>
      <option value="Reseaux et securite">Reseaux et securite</option>
      <option value="Developpement application">Developpement application</option>
    </select>
    ): props.element === 'select2' ? (
      <select
      id={props.id}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    >
      <option value=""></option>
      <option value="Employeur">Employeur</option>
      <option value="Etudiant">Etudiant</option>
      <option value="Coordonnateur">Coordonnateur</option>
    </select>
    ) : null;

    return (
      <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      </div>
    );
};

export default Input;