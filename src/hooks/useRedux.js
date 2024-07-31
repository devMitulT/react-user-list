import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addUser,
  selectId,
  updateUser,
  deleteUser,
  selectField,
  selectValue,
} from '../userSlice';

const initialState = {
  name: '',
  city: '',
  age: '',
};

export function useRedux() {
  const [data, setData] = useState(initialState);
  const [filteredUser, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTable, setIsTable] = useState(false);

  const users = useSelector((store) => store.user.users);
  const currentId = useSelector((store) => store.user.currentId);
  const currentField = useSelector((store) => store.user.currentField);
  const currentUniqueValue = useSelector(
    (store) => store.user.currentUniqueValue
  );

  function handleOnInputChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const dispatch = useDispatch();

  function handleCreateUser(e) {
    e.preventDefault();
    let isValid = true;
    if (
      data.name.trim() === '' ||
      data.city.trim() === '' ||
      data.age.trim() === ''
    ) {
      isValid = false;
      alert(
        'Please enter proper Details of all field , (empty field is not allowd'
      );
    } else {
      setIsLoading(true);
    }
    new Promise((resolve) => {
      setTimeout(() => {
        if (isValid) {
          if (currentId === 0) {
            dispatch(addUser({ id: new Date().getTime(), ...data }));
            setData(initialState);
          } else {
            dispatch(updateUser(data));
            setData(initialState);
          }
        }
        resolve();
      }, 1500);
    }).then(() => {
      setIsLoading(false);
    });
  }

  function handleOnChange(e) {
    e.preventDefault();
    const id = parseInt(e.target.value);
    dispatch(selectId(id));

    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const selectedUser = users.find((user) => user.id === id);

        if (selectedUser) {
          setData({ ...selectedUser });
        } else if (selectedUser === undefined) {
          setData(initialState);
        }
        resolve();
      }, 1000);
    }).then(() => setIsLoading(false));
  }

  function handleDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(deleteUser());
        setData(initialState);
        resolve();
      }, 1000);
    }).then(() => setIsLoading(false));
  }

  function handleAll() {
    setIsTable(true);
    new Promise((resolve) => {
      setTimeout(() => {
        setFilteredUsers(users);

        resolve();
      }, 500);
    }).then(() => setIsTable(false));
  }

  function handleFilter() {
    setIsTable(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const data = users.filter(
          (user) => user[currentField] === currentUniqueValue
        );
        setFilteredUsers(data);
        resolve();
      }, 700);
    }).then(() => setIsTable(false));
  }

  function handleSelectField(e) {
    const field = e.target.value;
    dispatch(selectField(field));
  }

  function handleSelectUnique(e) {
    const value = e.target.value;
    dispatch(selectValue(value));
  }

  return {
    users,
    currentId,
    currentField,
    currentUniqueValue,
    handleCreateUser,
    handleOnChange,
    handleDelete,
    handleSelectField,
    handleAll,
    handleFilter,
    data,
    filteredUser,
    handleSelectUnique,
    handleOnInputChange,
    isLoading,
    isTable,
  };
}
