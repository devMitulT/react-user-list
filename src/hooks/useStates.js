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
  function handleOnInputChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      if (selectedID !== 0) {
        const newUsers = update(users, selectedID, data);
        setUsers(newUsers);

        setData(initialState);
      } else {
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: new Date().getTime(), ...data },
        ]);
      }
    }
    setSelectedID(0);
    setData(initialState);
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
    handleOnInputChange,
  };
}
