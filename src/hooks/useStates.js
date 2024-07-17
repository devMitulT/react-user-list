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
  const [isLoading, setIsLoading] = useState(false);
  const [isTable, setIsTable] = useState(false);

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
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const selectedUser = users.find((user) => user.id === id);
        if (selectedUser) {
          setData({ ...selectedUser });
        } else {
          setData(initialState);
        }
        resolve();
      }, 1000);
    }).then(() => setIsLoading(false));
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
    } else {
      setIsLoading(true);
    }

    new Promise((resolve) => {
      setTimeout(() => {
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
        resolve();
      }, 1500);
    }).then(() => {
      setIsLoading(false);
    });
  }

  function handleDelete() {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const newUsers = users.filter(
          (user) => user.id !== parseInt(selectedID)
        );
        setUsers([...newUsers]);
        setSelectedID(0);
        setData(initialState);
        resolve();
      }, 1000);
    }).then(() => setIsLoading(false));
  }

  function handleFilterButton(e) {
    e.preventDefault();
    setIsTable(true);
    new Promise((resolve) => {
      setTimeout(() => {
        if (selectedField !== 'unknown' && uniqValue !== 'unknown') {
          const newUser = users.filter(
            (user) => user[selectedField] === uniqValue
          );
          setFilteredUser(newUser);
        }
        resolve();
      }, 700);
    }).then(() => {
      setIsTable(false);
    });
  }

  function handleAllButton(e) {
    e.preventDefault();
    setIsTable(true);
    new Promise((resolve) => {
      setTimeout(() => {
        setFilteredUser(users);
        resolve();
      }, 500);
    }).then(() => {
      setIsTable(false);
    });
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
    isLoading,
    isTable,
  };
}
