import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import GlobalStyles from '../../styles/global';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${GlobalStyles.fonts.bold};
  color: #312e38;
  font-size: 18px;
`;
