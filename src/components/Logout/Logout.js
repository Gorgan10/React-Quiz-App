import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../store/slices/authSlice/auth.slice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/'); // Перенаправление на главную страницу
  }, [dispatch, navigate]);

  return null;
};

export default Logout;