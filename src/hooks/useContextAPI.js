import { userConst } from '../userConst';
import { useState } from 'react';
import { useUsers } from '../context';

const initialState = {
  name: '',
  city: '',
  age: '',
};

export function useContextAPI() {
  const { users, dispatch, currentUniqueValue, currentField, currentId } =
    useUsers();
  const [filteredUser, setFilteredUsers] = useState([]);
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isTable, setIsTable] = useState(false);

  function handleOnInputChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handelChange(e) {
    const id = parseInt(e.target.value);

    dispatch({ type: userConst.SELECT_ID, payload: id });

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
      }, 500);
    }).then(() => {
      setIsLoading(false);
    });
  }

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
    }

    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        if (isValid) {
          if (currentId === 0) {
            dispatch({
              type: userConst.SAVE,
              payload: { id: new Date().getTime(), ...data },
            });
          } else {
            dispatch({
              type: userConst.UPDATE,
              payload: data,
            });
          }
        }

        setData(initialState);
        resolve();
      }, 500);
    }).then(() => {
      setIsLoading(false);
    });
  }

  function handleDelete() {
    if (users.length === 0) return;
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: userConst.DELETE });
        setData(initialState);
        resolve();
      }, 500);
    }).then(() => {
      setIsLoading(false);
    });
  }

  function handleAll() {
    setIsTable(true);
    new Promise((resolve) => {
      setTimeout(() => {
        setFilteredUsers(users);

        resolve();
      }, 500);
    }).then(() => {
      setIsTable(false);
    });
  }

  function handleFilter() {
    const data = users.filter(
      (user) => user[currentField] === currentUniqueValue
    );
    setIsTable(true);
    new Promise((resolve) => {
      setTimeout(() => {
        setFilteredUsers(data);

        resolve();
      }, 500);
    }).then(() => {
      setIsTable(false);
    });
  }

  function handleSelectField(e) {
    dispatch({ type: userConst.SELECT_FIELD, payload: e.target.value });
  }

  function handleSelectUnique(e) {
    dispatch({ type: userConst.SELECT_UNIQUE, payload: e.target.value });
  }
  return {
    users,
    currentId,
    currentField,
    currentUniqueValue,
    handleCreateUser,
    handelChange,
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
