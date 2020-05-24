import styled from 'styled-components/native';
import GlobalStyles from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: ${GlobalStyles.fonts.bold};
  margin: 64px 0 24px;
`;
