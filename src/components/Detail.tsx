import React, { useEffect, useRef } from 'react';
import stitches from '../stitches.config';
import trashImg from '../assets/trash-bin.png';

const { styled } = stitches;

const Wrapper = styled('section', {
  width: '100%',
  height: '1.85rem',
  margin: '1.25rem 0',
  display: 'flex',
  alignItems: 'center',
});

const CheckBox = styled('input', {
  appearance: 'none',
  backgroundColor: 'none',
  margin: 0,
  color: '$blue',
  height: '100%',
  aspectRatio: '1 / 1',
  border: '$border',
  borderRadius: '0.25em',
  display: 'grid',
  placeContent: 'center',
  cursor: 'pointer',

  '&::before': {
    content: '',
    width: '1.5em',
    height: '1.5em',
    transform: 'scale(0)',
    transition: '120ms transform ease-in-out',
    boxShadow: 'inset 100em 100em #007fff',
  },

  '&:checked::before': {
    transform: 'scale(1)',
  },
});

const Text = styled('p', {
  marginLeft: '0.5rem',
  fontSize: '$l',
  userSelect: 'none',
});

const Trash = styled('img', {
  height: '90%',
  margin: '0 0.75rem 0 auto',
  cursor: 'pointer',
  userSelect: 'none',
});

export interface Task {
  description: string | null;
  isCompleted: boolean;
}

interface Prop {
  id: number;
  task: Task;
  onCompleted: (id: number) => void;
  onDelete: (id: number) => void;
}

const Detail = ({ id, task, onCompleted, onDelete }: Prop) => {
  const checkBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (task.isCompleted && checkBox.current?.checked !== undefined)
      checkBox.current.checked = task.isCompleted;
  }, []);

  return (
    <Wrapper>
      <CheckBox type='checkbox' ref={checkBox} onClick={() => onCompleted(id)} />
      <Text style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
        {task.description}
      </Text>
      <Trash draggable='false' src={trashImg} alt='trash bin' onClick={() => onDelete(id)} />
    </Wrapper>
  );
};

export default Detail;
