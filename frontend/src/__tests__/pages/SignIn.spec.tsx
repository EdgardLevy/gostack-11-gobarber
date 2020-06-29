import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn Page', () => {
  it('should by able to sign in ', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const signInButton = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'user@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(signInButton);

    await (() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
