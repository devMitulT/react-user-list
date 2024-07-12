import { useState } from 'react';
import { useUsers } from '../context';
import Filter from '../components/Filter';
import Form from '../components/Form';
import { userConst } from '../userConst';

const initialState = {
  name: '',
  city: '',
  age: '',
};

function ContextAPI() {
  const { users, dispatch, currentUniqueValue, currentField, currentId } =
    useUsers();
  const [filteredUser, setFilteredUsers] = useState([]);
  const [data, setData] = useState(initialState);

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
        dispatch({
          type: userConst.SAVE,
          payload: { id: new Date().getTime(), ...newUser },
        });
      } else {
        dispatch({
          type: userConst.UPDATE,
          payload: newUser,
        });
      }
    }

    setData(initialState);
    // dispatch({ type: userConst., payload: 0 });

    e.target.reset();
  }

  function handleDelete() {
    if (users.length == 0) return;

    dispatch({ type: userConst.DELETE });
    // dispatch({ type: 'selectID', payload: 0 });
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

  return (
    <>
      <h1>ContextAPI + useReducer()</h1>
      <br />
      <Form
        handleSubmit={handleCreateUser}
        data={data}
        users={users}
        handleDelete={handleDelete}
        selectedID={currentId}
        handelChange={handelChange}
      />
      <br />
      <br />
      <Filter
        filteredUser={filteredUser}
        handleOnChangeForUniqValue={handleSelectUnique}
        handleAllButton={handleAll}
        handleFilterButton={handleFilter}
        handleOnChangeForField={handleSelectField}
        users={users}
        selectedField={currentField}
        uniqueValue={currentUniqueValue}
      />
    </>
  );
}

export default ContextAPI;
