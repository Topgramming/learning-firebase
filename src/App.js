import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

function App() {
  // State to create new user
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newHeight, setNewHeight] = useState('');

  // State of current users
  const [users, setUsers] = useState([]);

  // Loading database, specially 'users' table
  const usersCollectionRef = collection(db, 'users');

  // Function that gets called when page loads, first create an async function
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data.docs);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
      height: Number(newHeight),
    });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <input
        placeholder="Name"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Height"
        onChange={(event) => {
          setNewHeight(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div className="userDiv">
            {''}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Height: {user.height}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
