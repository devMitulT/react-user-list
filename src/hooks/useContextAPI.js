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

  function handleOnInputChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handelChange(e) {
    const id = parseInt(e.target.value);

    dispatch({ type: userConst.SELECT_ID, payload: id });

    const selectedUser = users.find((user) => user.id === id);

    if (selectedUser) {
      setData({ ...selectedUser });
    } else if (selectedUser === undefined) {
      setData(initialState);
    }
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
  }

  function handleDelete() {
    if (users.length === 0) return;

    dispatch({ type: userConst.DELETE });
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
  };
}
