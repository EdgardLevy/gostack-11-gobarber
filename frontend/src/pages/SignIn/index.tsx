import React from 'react';

import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber Web" />
      <form>
        <h1>Faça se logon</h1>
        <input placeholder="E-mail" autoComplete="disabled" />
        <input type="password" placeholder="password" />
        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="">
        <FiLogIn size={20} />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
