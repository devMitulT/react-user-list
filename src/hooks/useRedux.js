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

  const users = useSelector((store) => store.user.users);
  const currentId = useSelector((store) => store.user.currentId);
  const currentField = useSelector((store) => store.user.currentField);
  const currentUniqueValue = useSelector(
    (store) => store.user.currentUniqueValue
  );

  const dispatch = useDispatch();

  function handleCreateUser(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {};
    let isValid = true;

    formData.forEach((value, key) => {
      if (value.trim() === '') {
        alert(key + ' should have a value');
        isValid = false;
      } else {
        newUser[key] = value;
      }
    });

    if (isValid) {
      if (currentId === 0) {
        dispatch(addUser({ id: new Date().getTime(), ...newUser }));
      } else {
        dispatch(updateUser(newUser));
        setData(initialState);
      }
    }

    e.target.reset();
  }

  function handleOnChange(e) {
    e.preventDefault();
    const id = parseInt(e.target.value);
    dispatch(selectId(id));

    const selectedUser = users.find((user) => user.id === id);

    if (selectedUser) {
      setData({ ...selectedUser });
    } else if (selectedUser === undefined) {
      setData(initialState);
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteUser());
    // dispatch(selectId(0));
    setData(initialState);
  }

  function handleAll() {
    setFilteredUsers(users);
  }

  function handleFilter() {
    const data = users.filter(
      (user) => user[currentField] === currentUniqueValue
    );
    setFilteredUsers(data);
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
  };
}
