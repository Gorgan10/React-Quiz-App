import React, { useEffect } from 'react';
import cl from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { API_ENDPOINTS } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { onSubmit, updateControls, logout, authSuccess, setLogoutTimer } from '../../store/slices/authSlice/auth.slice';
import { authHandler } from '../../store/slices/authSlice/auth.slice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { formControls, isFormValid, error, loading, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedExpirationDate = localStorage.getItem('expirationDate');

    if (storedToken && storedExpirationDate && new Date(storedExpirationDate) > new Date()) {
      const remainingTime = new Date(storedExpirationDate).getTime() - new Date().getTime();
      dispatch(setLogoutTimer(remainingTime));
      dispatch(authSuccess({
        token: storedToken,
        userId: storedUserId,
        expirationDate: storedExpirationDate
      }));
    } else {
      dispatch(logout());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    dispatch(authHandler({ formControls, API_ENDPOINT: API_ENDPOINTS.SIGN_IN }));
  };

  const handleRegister = () => {
    dispatch(authHandler({ formControls, API_ENDPOINT: API_ENDPOINTS.SIGN_UP }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(onSubmit());
  };

  const handleChange = (event, controlName) => {
    const { value } = event.target;
    dispatch(updateControls({ value, controlName }));
  };

  const renderInput = () => {
    return Object.keys(formControls).map((ctrlName, index) => {
      const control = formControls[ctrlName];
      return (
        <Input
          key={ctrlName + index}
          label={control.label}
          type={control.type}
          value={control.value}
          valid={control.valid}
          error={error}
          touched={control.touched}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.rules}
          onChange={(e) => handleChange(e, ctrlName)}
        />
      );
    });
  };

  return (
    <div className={cl.Auth}>
      <div>
        <h1>Log In</h1>
        <form className={cl.Form} onSubmit={handleSubmit}>
          {error && <p className={cl.errorMessage}>{error}</p>}
          {renderInput()}
          <div className={cl.buttons}>
            <Button type="primary" onClick={handleLogin} disabled={!isFormValid || loading}>Sign in</Button>
            <Button type="success" onClick={handleRegister} disabled={!isFormValid || loading}>Sign up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
