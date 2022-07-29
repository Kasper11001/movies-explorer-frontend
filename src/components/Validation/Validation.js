import { useCallback, useState } from "react";


export function useFormWithValidation(currentUser) {
  if (currentUser === undefined) {
    currentUser = {name : '', email : ''};
  }
  const [values, setValues] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };


  const resetForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}