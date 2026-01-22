import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>Silakan Masuk</h1>
      </header>
      <article className="login-page__main">
        <h2>Yuk, Lanjut Diskusi.</h2>
        <LoginInput login={onLogin} />
        <p>
          Belum punya akun? <Link to="/register">Daftar di sini.</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;