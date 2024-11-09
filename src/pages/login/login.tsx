import { ChangeEvent, FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/stores/store';
import { loginUser } from '../../services/slices/authSlice';
import { useForm } from '../../services/hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [values, handleChange] = useForm({ email: '', password: '' });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <LoginUI
      errorText=''
      email={values.email}
      password={values.password}
      setEmail={(value) =>
        handleChange({
          target: { name: 'email', value }
        } as ChangeEvent<HTMLInputElement>)
      }
      setPassword={(value) =>
        handleChange({
          target: { name: 'password', value }
        } as ChangeEvent<HTMLInputElement>)
      }
      handleSubmit={handleSubmit}
    />
  );
};
