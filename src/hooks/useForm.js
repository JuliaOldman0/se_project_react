import { useCallback, useRef, useState } from "react";

function useForm(initialValues = {}) {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const resetForm = useCallback((newValues) => {
    setValues(newValues || initialValuesRef.current);
  }, []);

  return { values, handleChange, resetForm };
}

export default useForm;
