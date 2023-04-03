import React from 'react';
import stitches from '../stitches.config';

const { styled } = stitches;

const Heading = styled('h1', {
  width: 'auto',
  height: 'auto',
  fontFamily: '$title',
  fontSize: '$xl',
  fontWeight: '$bolder',
  color: '$fg',
  userSelect: 'none',
});

const Title = () => {
  return <Heading>#todo</Heading>;
};

export default Title;
