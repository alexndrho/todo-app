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

const Main = styled('main', {
  width: '100%',
  height: '100%',
});

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
  fontSize: '$md',
  fontWeight: '400',
});

const Input = styled('input', {
  width: 'auto',
  height: '2.5rem',
  padding: '0.65rem',
  color: '$black',
  fontSize: '$l',
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
  fontSize: '$md',
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

const ErrorMessage = styled('p', {
  fontSize: '$md',
  color: '$red',
});

interface Prop {
  setIsLogin: (x: boolean) => void;
}

const Login = ({ setIsLogin }: Prop) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

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
      setEmailError('');
      setPassError('');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, ': ', e.message);

        //email
        if (e.code === 'auth/invalid-email') {
          setEmailError('Invalid Email!');
        } else if (e.code === 'auth/email-already-in-use') {
          setEmailError('Email is already in use!');
        } else {
          setEmailError('');
        }

        //password
        if (e.code === 'auth/missing-password') {
          setPassError('Password is missing!');
        } else if (e.code === 'auth/weak-password') {
          setPassError('Password should be at least 6 characters!');
        } else {
          setPassError('');
        }
      }
    }
  };

  const logInHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmailError('');
      setPassError('');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, ': ', e.message);

        //email
        if (e.code === 'auth/invalid-email') {
          setEmailError('Invalid email!');
        } else if (e.code === 'auth/user-not-found') {
          setEmailError('User not found!');
        } else if (e.code === 'auth/too-many-requests') {
          setEmailError(
            'Access to this account has been temporarily disabled due to many failed login attempts.',
          );
        } else {
          setEmailError('');
        }

        //password
        if (e.code === 'auth/missing-password') {
          setPassError('Password is missing!');
        } else if (e.code === 'auth/wrong-password') {
          setPassError('Incorrect password!');
        } else {
          setPassError('');
        }
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
    <Main>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Title>Login</Title>

        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          css={{
            border: emailError === '' ? '$border' : '$borderError',
          }}
        />
        <ErrorMessage>{emailError}</ErrorMessage>

        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          css={{
            border: passError === '' ? '$border' : '$borderError',
          }}
        />
        <ErrorMessage>{passError}</ErrorMessage>

        <Div>
          <Button
            color='gray'
            type='button'
            onClick={signUpHandler}
            css={{
              flexGrow: 1,
              marginRight: '0.5rem',
            }}
          >
            Sign Up
          </Button>

          <Button color='blue' type='submit' onClick={logInHandler} css={{ flexGrow: 1 }}>
            Log In
          </Button>
        </Div>

        <Button
          color='gray'
          type='button'
          onClick={signInWithGoogleHandler}
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Img src={GoogleIcon} alt='Google icon' />
          Sign in with Google
        </Button>
      </Form>
    </Main>
  );
};

export default Login;
