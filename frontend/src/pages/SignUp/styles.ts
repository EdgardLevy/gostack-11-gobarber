import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  /* background: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: #f4ede8;
    text-decoration: none;
    margin-top: 24px;
    display: block;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
export const Background = styled.div`
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
  flex: 1;
  /* transition: all 0.5s ease;
  &:hover {
    transform: scale(0.98);
  } */
`;
