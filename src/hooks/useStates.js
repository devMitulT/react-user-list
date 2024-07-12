import { useState } from 'react';

const initialState = {
  name: '',
  city: '',
  age: '',
};

export function useStates() {
  const [users, setUsers] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [data, setData] = useState(initialState);
  const [selectedField, setSelectedField] = useState('unknown');
  const [filteredUser, setFilteredUser] = useState(users);
  const [uniqValue, setUniqValue] = useState('unknown');

  function update(arr, id, updatedData) {
    return arr.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
  }

  function handelChange(e) {
    e.preventDefault();
    const id = parseInt(e.target.value);
    setSelectedID(id);

    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      setData({ ...selectedUser });
    } else {
      setData(initialState);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newUser = {};
    let isValid = true;

    formData.forEach((value, key) => {
      if (value.trim() === '') {
        alert(key + ' should have a value');
        isValid = false;
      } else {
        newUser[key] = value.trim();
      }
    });

    if (isValid) {
      if (selectedID !== 0) {
        const newUsers = update(users, selectedID, newUser);
        setUsers(newUsers);

        setData(initialState);
      } else {
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: new Date().getTime(), ...newUser },
        ]);
      }
    }
    setSelectedID(0);

    e.target.reset();
  }

  function handleDelete() {
    const newUsers = users.filter((user) => user.id !== parseInt(selectedID));
    setUsers([...newUsers]);
    setSelectedID(0);
    setData(initialState);
  }

  function handleFilterButton(e) {
    e.preventDefault();
    if (selectedField !== 'unknown' && uniqValue !== 'unknown') {
      const newUser = users.filter((user) => user[selectedField] === uniqValue);
      setFilteredUser(newUser);
    }
  }

  function handleAllButton(e) {
    e.preventDefault();
    setFilteredUser(users);
  }

  function handleOnChangeForField(e) {
    e.preventDefault();

    setUniqValue('unknown');

    setSelectedField(e.target.value);
  }

  function handleOnChangeForUniqValue(e) {
    e.preventDefault();
    setUniqValue(e.target.value);
  }

  return {
    users,
    selectedID,
    data,
    filteredUser,
    selectedField,
    uniqValue,
    handleSubmit,
    handelChange,
    handleDelete,
    handleFilterButton,
    handleAllButton,
    handleOnChangeForField,
    handleOnChangeForUniqValue,
  };
}
