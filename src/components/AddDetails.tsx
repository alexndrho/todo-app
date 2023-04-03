import React, { useRef } from 'react';
import stitches from '../stitches.config';

const { styled } = stitches;

const Wrapper = styled('section', {
  width: '100%',
  margin: '1rem 0 1.5rem 0',
  height: '3.5rem',
  display: 'flex',
});

const Input = styled('input', {
  height: '100%',
  marginRight: '1.75rem',
  padding: '0.85rem',
  flexGrow: 6,
  border: '$border',
  borderRadius: '$borderRadius',
  outline: 0,
  fontFamily: '$default',
  fontSize: '$md',
  color: '$lightBlack',
  fontWeight: '$regular',
  caretColor: '$blue',
});

const Button = styled('button', {
  height: '100%',
  flexGrow: 1,
  background: '$blue',
  border: 'none',
  borderRadius: '$borderRadius',
  fontFamily: '$default',
  fontSize: '$md',
  fontWeight: '$bold',
  color: 'White',

  '&:hover': {
    background: '$lightBlue',
  },
});

interface Props {
  isHide: boolean;
  onAddDetail: (desc: string) => void;
}

const AddDetails = ({ isHide, onAddDetail }: Props) => {
  const input = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (input.current?.value === '' || input.current?.value === undefined) return;

    onAddDetail(input.current.value);
    input.current.value = '';
  };

  return (
    <Wrapper style={{ display: !isHide ? 'flex' : 'none' }}>
      <Input
        ref={input}
        type='text'
        placeholder='add details'
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
      />
      <Button onClick={handleSubmit}>Add</Button>
    </Wrapper>
  );
};

export default AddDetails;
