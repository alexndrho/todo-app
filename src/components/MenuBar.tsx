import React from 'react';
import stitches from '../stitches.config';

const { styled } = stitches;

const Wrapper = styled('nav', {
  width: '100%',
  height: '3.25rem',
  marginBottom: '1.25rem',
  display: 'flex',
  justifyContent: 'space-around',
  borderBottom: '$border',
});

const Button = styled('button', {
  width: '6rem',
  height: 'auto',
  background: 'none',
  color: '$fg',
  border: 'none',
  fontFamily: '$default',
  fontWeight: '$bold',
  fontSize: '$md',
  position: 'relative',
});

const ButtonBorder = styled('div', {
  content: '',
  width: '100%',
  height: 0,
  // height: '0.25rem',
  borderRadius: '0.25rem 0.25rem 0 0',
  background: '$blue',
  display: 'block',
  position: 'absolute',
  left: 0,
  bottom: 0,
  transition: '0.1s',
});

export enum Mode {
  All,
  Active,
  Completed,
}

export type ModeStr = 'all' | 'active' | 'completed';

interface Props {
  mode: Mode;
  onModeChange: (mode: ModeStr) => void;
}

const MenuBar = ({ mode, onModeChange }: Props) => {
  const buttonEffect = (x: Mode, y: Mode) => {
    if (x === y) return { height: '0.25rem' };
    return { height: 0 };
  };

  return (
    <Wrapper>
      <Button onClick={() => onModeChange('all')}>
        All <ButtonBorder style={buttonEffect(mode, Mode.All)} />
      </Button>
      <Button onClick={() => onModeChange('active')}>
        Active <ButtonBorder style={buttonEffect(mode, Mode.Active)} />
      </Button>
      <Button onClick={() => onModeChange('completed')}>
        Completed <ButtonBorder style={buttonEffect(mode, Mode.Completed)} />
      </Button>
    </Wrapper>
  );
};

export default MenuBar;
