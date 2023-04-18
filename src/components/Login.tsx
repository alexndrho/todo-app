import GoogleIcon from '../assets/google-icon.png';

import React, { useEffect, useState } from 'react';
import stitches from '../stitches.config';
import { auth, googleProvider } from '../api/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const { styled } = stitches;

const Form = styled('form', {
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

interface Prop {
  setIsLogin: (x: boolean) => void;
}

const Login = ({ setIsLogin }: Prop) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const signUpHandler = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, ': ', e.message);
      }
    }
  };

  const logInHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, ': ', e.message);
      }
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, ': ', e.message);
      }
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Title>Login</Title>
      <Label htmlFor='email'>Email</Label>
      <Input id='email' type='email' onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <Input id='password' type='password' onChange={(e) => setPassword(e.target.value)} />
      <Div>
        <Button
          color='gray'
          onClick={signUpHandler}
          css={{
            flexGrow: 1,
            marginRight: '0.5rem',
          }}
        >
          Sign Up
        </Button>
        <Button color='blue' onClick={logInHandler} css={{ flexGrow: 1 }}>
          Log In
        </Button>
      </Div>
      <Button
        color='gray'
        onClick={signInWithGoogleHandler}
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img src={GoogleIcon} />
        Sign in with Google
      </Button>
    </Form>
  );
};

export default Login;
