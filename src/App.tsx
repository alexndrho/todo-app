import React, { useState } from 'react';
import stitches from './stitches.config';
import Title from './components/Title';
import MenuBar, { Mode, ModeStr } from './components/MenuBar';
import AddDetails from './components/AddDetails';
import Detail, { Task } from './components/Detail';
import DeleteBtn from './components/DeleteBtn';
import '@fontsource/raleway/700.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';

const { styled } = stitches;

const Wrapper = styled('div', {
  width: '$conWidth',
  height: '100%',
  paddingBottom: '2rem',
});

const Header = styled('header', {
  width: '100%',
  height: '6.5rem',
  marginBottom: '0.25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Main = styled('main', {
  width: '100%',
  height: 'auto',
});

const DelBtnWrapper = styled('section', {
  width: '100%',
  height: '2.85rem',
});

const App = () => {
  const [mode, setMode] = useState<Mode>(Mode.All);
  const [tasks, setTasks] = useState<Array<Task>>([]);

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
        <Title />
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

export default App;
