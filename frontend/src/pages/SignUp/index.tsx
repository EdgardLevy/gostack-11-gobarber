import React from 'react';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleFormSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber Web" />
        <Form onSubmit={handleFormSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome"
            autoComplete="disabled"
          />
          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            autoComplete="disabled"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="/">
          <FiArrowLeft size={20} />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
