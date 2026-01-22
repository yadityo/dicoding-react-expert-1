import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    await dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>Daftar Akun</h1>
      </header>
      <article className="register-page__main">
        <h2>Buat akun barumu sekarang!</h2>
        <RegisterInput register={onRegister} />
        <p>
          Sudah punya akun? <Link to="/">Masuk di sini.</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;