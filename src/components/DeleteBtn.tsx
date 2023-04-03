import React from 'react';
import trashIcon from '../assets/trash-bin-white.png';
import stitches from '../stitches.config';

const { styled } = stitches;

const Button = styled('button', {
  width: '9em',
  height: '100%',
  marginLeft: 'auto',
  background: '$red',
  border: 'none',
  borderRadius: '$delete',
  fontFamily: '$default',
  fontSize: '$md',
  fontWeight: '$bold',
  color: 'White',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&:hover': {
    background: '$lightRed',
  },
});

const Img = styled('img', {
  height: '1.25em',
  marginRight: '0.35em',
});

interface Props {
  onDelete: () => void;
}

const DeleteBtn = ({ onDelete }: Props) => {
  return (
    <Button onClick={onDelete}>
      <Img src={trashIcon} />
      Delete All
    </Button>
  );
};

export default DeleteBtn;
