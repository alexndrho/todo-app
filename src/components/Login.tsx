import GoogleIcon from '../assets/google-icon.png';

import React from 'react';
import stitches from '../stitches.config';

const { styled } = stitches;

const Wrapper = styled('div', {
  width: '$conWidthLogin',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Title = styled('h1', {
  margin: 0,
  fontSize: '2rem',
  color: '$black',
});

const Label = styled('label', {
  marginTop: '0.5rem',
  color: 'Gray',
  fontSize: '1rem',
  fontWeight: '400',
});

const Input = styled('input', {
  width: 'auto',
  height: '2.5rem',
  padding: '0.65rem',
  color: '$black',
  fontSize: '1.25rem',
  border: '$border',
  borderRadius: '0.35rem',
});

const Div = styled('div', {
  margin: '0.75rem 0 0.5rem 0',
  width: '100%',
  height: 'auto',
  display: 'flex',
});

const Button = styled('button', {
  height: '3rem',
  background: 'none',
  borderRadius: '0.35rem',
  border: 'none',
  fontSize: '1rem',
  fontFamily: '$default',
  fontWeight: '500',
  color: '$black',

  variants: {
    color: {
      blue: {
        background: '$blue',
        color: 'white',

        '&:active': {
          background: '$lightBlue',
        },
      },

      gray: {
        background: '$btnGray',
        color: '$btnGrayColor',

        '&:active': {
          background: '$btnLightGray',
        },
      },
    },
  },
});

const Img = styled('img', {
  height: '1.5rem',
  marginRight: '0.5rem',
});

const Login = () => {
  return (
    <Wrapper>
      <Title>Login</Title>
      <Label htmlFor='email'>Email</Label>
      <Input id='email' />
      <Label>Password</Label>
      <Input id='password' type='password' />
      <Div>
        <Button
          color='gray'
          css={{
            flexGrow: 1,
            marginRight: '0.5rem',
          }}
        >
          Sign Up
        </Button>
        <Button color='blue' css={{ flexGrow: 1 }}>
          Log In
        </Button>
      </Div>
      <Button
        color='gray'
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img src={GoogleIcon} />
        Sign in with Google
      </Button>
    </Wrapper>
  );
};

export default Login;
