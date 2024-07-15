import Filter from '../components/Filter';
import Form from '../components/Form';
import { useRedux } from '../hooks/useRedux';

function Redux() {
  const {
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
    handleOnInputChange,
  } = useRedux();

  return (
    <>
      <h1>Redux Tool Kit</h1>
      <br />
      <Form
        handleDelete={handleDelete}
        handelChange={handleOnChange}
        handleSubmit={handleCreateUser}
        handleInputChange={handleOnInputChange}
        data={data}
        users={users}
        selectedID={currentId}
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

export default Redux;
