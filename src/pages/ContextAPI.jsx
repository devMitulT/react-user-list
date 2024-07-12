import Filter from '../components/Filter';
import Form from '../components/Form';
import { useContextAPI } from '../hooks/useContextAPI';

function ContextAPI() {
  const {
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
  } = useContextAPI();

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
