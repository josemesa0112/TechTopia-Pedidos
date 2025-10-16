/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';

const useFormData = (initialState: object) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState(initialState);

  const updateFormData = () => {
    if (form.current) {
      const formData = new FormData(form.current);
      const updatedData: any = {};
      formData.forEach((value, key) => {
        updatedData[key] = value;
      });
      setFormData(updatedData);
    }
  };

  return { form, formData, updateFormData };
};

export default useFormData;
