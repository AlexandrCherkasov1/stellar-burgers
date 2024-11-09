import { ChangeEvent, useState } from 'react';

export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return [form, handleChange] as const; // используем as const для правильной типизации кортежа
}
