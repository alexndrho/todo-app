import stitches from '../stitches.config';
import { auth, db } from '../api/firebase';
import MenuBar, { Mode, ModeStr } from './MenuBar';
import AddDetails from './AddDetails';
import Detail, { Task } from './Detail';
import DeleteBtn from './DeleteBtn';

import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
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

  const uid = auth.currentUser?.uid;
  const todosCollectionRef = collection(db, 'users', `${uid}`, 'todos');

  useEffect(() => {
    const q = query(todosCollectionRef, orderBy('description'));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Task),
          id: doc.id,
        })),
      );
    });
  }, []);

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

  const addTask = async (desc: string) => {
    try {
      await addDoc(todosCollectionRef, {
        description: desc,
        isCompleted: false,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChecked = async (id: string) => {
    const taskDocRef = doc(db, 'users', `${uid}`, 'todos', id);
    try {
      const docSnap = await getDoc(taskDocRef);
      if (docSnap.exists()) {
        await updateDoc(taskDocRef, {
          isCompleted: !docSnap.data().isCompleted,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    const taskDocRef = doc(db, 'users', `${uid}`, 'todos', id);
    try {
      await deleteDoc(taskDocRef);
    } catch (e) {
      console.error(e);
    }
  };

  const filterTasks = () => {
    switch (mode) {
      case Mode.All:
        return tasks.map((task) => (
          <Detail key={task.id} task={task} onCompleted={handleChecked} onDelete={handleDelete} />
        ));
      case Mode.Active:
        return tasks.map((task) => {
          if (task.isCompleted) return <></>;

          return (
            <Detail key={task.id} task={task} onCompleted={handleChecked} onDelete={handleDelete} />
          );
        });
      case Mode.Completed:
        return tasks.map((task) => {
          if (!task.isCompleted) return <></>;

          return (
            <Detail key={task.id} task={task} onCompleted={handleChecked} onDelete={handleDelete} />
          );
        });
    }
  };

  // Checks if there is completed task
  const checkTaskCompleted = () => {
    let completed = false;

    tasks.forEach((task) => {
      if (task.isCompleted) completed = true;
    });

    return completed;
  };

  const deleteAllCompletedTask = async () => {
    try {
      const docs = await getDocs(todosCollectionRef);

      docs.forEach((document) => {
        if (!document.data().isCompleted) return;
        const taskDocRef = doc(db, 'users', `${uid}`, 'todos', `${document.id}`);
        const delTask = async () => {
          try {
            await deleteDoc(taskDocRef);
          } catch (e) {
            console.error(e);
          }
        };

        delTask();
      });
    } catch (e) {
      console.error(e);
    }
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
