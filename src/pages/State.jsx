import { useCallback, useState } from 'react';
import Form from '../components/Form';
import Filter from '../components/Filter';

const initialState = {
  name: '',
  city: '',
  age: '',
};

function State() {
  const [users, setUsers] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [data, setData] = useState(initialState);
  const [selectedField, setSelectedField] = useState('unknown');
  const [filteredUser, setFilteredUser] = useState(users);
  const [uniqValue, setUniqValue] = useState('unknown');
  const [, forceRender] = useState(undefined);

  const handleClick = () => {
    forceRender((prev) => !prev);
  };

  function update(arr, id, updatedData) {
    return arr.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
  }

  // handlling selection id store in data
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

  //updating or save the data as per the condition
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newUser = {};
    let isValid = true;

    // Populate newUser object with form data
    formData.forEach((value, key) => {
      if (value.trim() === '') {
        alert(key + ' should have a value');
        isValid = false;
      } else {
        newUser[key] = value.trim();
      }
    });

    // Check if a user is selected for update

    if (isValid) {
      if (selectedID !== 0) {
        // Update the specific user based on selectedID
        const newUsers = update(users, selectedID, newUser);
        setUsers(newUsers);

        setData(initialState); // Reset selectedID
      } else {
        // Add a new user if selectedID is 'null'
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: new Date().getTime(), ...newUser },
        ]);
      }
    }
    setSelectedID(0);
    handleClick();
    e.target.reset(); // Reset the form after submission
  }

  //handle delete
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

  return (
    <>
      <h1>Using useState Hook </h1>
      <br />
      <Form
        handleDelete={handleDelete}
        handelChange={handelChange}
        handleSubmit={handleSubmit}
        data={data}
        users={users}
        selectedID={selectedID}
      />
      <br />
      <Filter
        filteredUser={filteredUser}
        handleOnChangeForUniqValue={handleOnChangeForUniqValue}
        handleAllButton={handleAllButton}
        handleFilterButton={handleFilterButton}
        handleOnChangeForField={handleOnChangeForField}
        users={users}
        selectedField={selectedField}
        uniqueValue={uniqValue}
      />
      <br />
    </>
  );
}

export default State;
