import MenuBar, { Mode, ModeStr } from './MenuBar';
import AddDetails from './AddDetails';
import Detail, { Task } from './Detail';
import DeleteBtn from './DeleteBtn';

import React, { useState } from 'react';
import stitches from '../stitches.config';
import { auth } from '../api/firebase';
import { signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const { styled } = stitches;

const Wrapper = styled('div', {
  width: '$conWidth',
  height: '100%',
  paddingBottom: '2rem',
});

const Header = styled('header', {
  position: 'relative',
  width: '100%',
  height: '6.5rem',
  marginBottom: '0.25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled('h1', {
  width: 'auto',
  height: 'auto',
  fontFamily: '$title',
  fontSize: '$xl',
  fontWeight: '$bolder',
  color: '$fg',
  userSelect: 'none',
});

const SignOutBtn = styled('button', {
  position: 'absolute',
  right: '0',
  width: '5.5rem',
  height: '2.8rem',
  fontSize: '0.85rem',
  fontFamily: '$default',
  fontWeight: '500',
  border: 'none',
  background: '$btnGray',
  color: '$btnGrayColor',
  borderRadius: '0.5rem',

  '&:active': {
    background: '$btnLightGray',
  },
});

const Main = styled('main', {
  width: '100%',
  height: 'auto',
});

const DelBtnWrapper = styled('section', {
  width: '100%',
  height: '2.85rem',
});

const Todo = () => {
  const [mode, setMode] = useState<Mode>(Mode.All);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const signOutHandler = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, ': ', e.message);
      }
    }
  };

  const handleSetMode = (mode: ModeStr) => {
    if (mode === 'all') {
      setMode(Mode.All);
    } else if (mode === 'active') {
      setMode(Mode.Active);
    } else if (mode === 'completed') {
      setMode(Mode.Completed);
    }
  };

  const addTask = (desc: string): void => {
    const newDesc: Task = {
      description: desc,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newDesc]);
  };

  const handleChecked = (id: number): void => {
    const copyTasks = tasks;
    copyTasks[id].isCompleted = !copyTasks[id].isCompleted;

    setTasks([...copyTasks]);
  };

  const handleDelete = (id: number): void => {
    setTasks(tasks.filter((task, index) => index !== id));
  };

  const filterTasks = (): JSX.Element[] => {
    switch (mode) {
      case Mode.All:
        return tasks.map((task, index) => (
          <Detail
            key={crypto.randomUUID()}
            id={index}
            task={task}
            onCompleted={handleChecked}
            onDelete={handleDelete}
          />
        ));
      case Mode.Active:
        return tasks.map((task, index) => {
          if (task.isCompleted) return <></>;

          return (
            <Detail
              key={crypto.randomUUID()}
              id={index}
              task={task}
              onCompleted={handleChecked}
              onDelete={handleDelete}
            />
          );
        });
      case Mode.Completed:
        return tasks.map((task, index) => {
          if (!task.isCompleted) return <></>;

          return (
            <Detail
              key={crypto.randomUUID()}
              id={index}
              task={task}
              onCompleted={handleChecked}
              onDelete={handleDelete}
            />
          );
        });
    }
  };

  // Checks if there is completed task
  const checkTaskCompleted = (): boolean => {
    let completed = false;

    tasks.forEach((task) => {
      if (task.isCompleted) completed = true;
    });

    return completed;
  };

  const deleteAllCompletedTask = (): void => {
    const copyTasks = tasks.filter((task) => !task.isCompleted);

    setTasks(copyTasks);
  };

  return (
    <Wrapper>
      <Header>
        <Title>#todo</Title>
        <SignOutBtn onClick={signOutHandler}>Sign Out</SignOutBtn>
      </Header>
      <Main>
        <MenuBar mode={mode} onModeChange={handleSetMode} />
        <AddDetails isHide={!(mode === Mode.All || mode === Mode.Active)} onAddDetail={addTask} />
        {filterTasks()}
      </Main>
      <DelBtnWrapper
        style={{ display: mode === Mode.Completed && checkTaskCompleted() ? 'block' : 'none' }}
      >
        <DeleteBtn onDelete={deleteAllCompletedTask} />
      </DelBtnWrapper>
    </Wrapper>
  );
};

export default Todo;
