import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

describe('SignIn Page', () => {
  it('should by able to sign in ', () => {
    const result = render(<SignIn />);
  });
});
