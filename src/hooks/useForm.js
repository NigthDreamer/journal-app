import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  /**
   * Cada vez que el estado del formulario cambie, volveremos a comprobar
   * las validaciones
   */
  useEffect(() => {
    createValidators();
  }, [formState]);

  /**
   * Cuando cambie el @var formState comprobamos si hay algun error de validacion,
   * Si lo hay, devolvemos true, en caso contrario, false
   */
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if( formValidation[formValue] !== null ) return false;
    }
    
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      /**
       * El primer elemento de cada array del @var formValidations es una funcion flecha
       */
      const [fn, errorMessage = '*Este campo es requerido'] = formValidations[formField];

      /**
       * Ejecuta la funcion de validacion con el valor correspondiente del estado del
       * formulario y devuelve null o error tras hacer la validacion, guardando el 
       * resultado en el objeto @var formCheckedValues, creando una propiedad computada
       * dentro de él
       */
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

      /**
       * Seteo el @var formValidations con los valores del @var formCheckedValues
       */
      setFormValidation(formCheckedValues);
    }
  };

  return {
    ...formState,
    formState,
    onResetForm,
    onInputChange,
    ...formValidation,
    isFormValid,
  };
};
