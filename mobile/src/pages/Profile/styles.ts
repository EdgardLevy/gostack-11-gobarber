import styled from 'styled-components/native';
import { Platform } from 'react-native';
import GlobalStyles from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: ${GlobalStyles.fonts.bold};
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
  height: 24px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;
export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;

  align-self: center;
`;
