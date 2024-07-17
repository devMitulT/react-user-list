import Filter from '../components/Filter';
import Form from '../components/Form';
import { Header } from '../components/MuiComponents';
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
    handleOnInputChange,
    isLoading,
    isTable,
  } = useContextAPI();

  return (
    <>
      <Header>ContextAPI + useReducer()</Header>
      <br />
      <Form
        handleSubmit={handleCreateUser}
        data={data}
        users={users}
        handleDelete={handleDelete}
        selectedID={currentId}
        handelChange={handelChange}
        handleInputChange={handleOnInputChange}
        isLoading={isLoading}
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
        isTable={isTable}
      />
    </>
  );
}

export default ContextAPI;
