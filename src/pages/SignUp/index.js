import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logosvg.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <input placeholder="Nome completo" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho um conta</Link>
      </form>
    </>
  );
}
