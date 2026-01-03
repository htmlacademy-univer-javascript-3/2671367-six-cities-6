import { FC, useState, FormEvent, useCallback, ChangeEvent } from 'react';
import { login } from '../../entities/user/data/login-user';
import { useAppDispatch } from '../../shared/hooks/app-hooks';
import { useAuthError } from '../../entities/user';
import { useNavigate } from 'react-router-dom';

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const authError = useAuthError();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);

  const submitLogin = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch {
      // ошибка уже сохранена в state.user.authError
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, formData, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitLogin();
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={onChange}
          />
        </div>

        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={onChange}
          />
        </div>

        {authError && <p className="login__error">{authError.message}</p>}

        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </section>
  );
};
