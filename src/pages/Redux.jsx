import { Link } from 'react-router-dom';
import Filter from '../components/Filter';
import Form from '../components/Form';
import { Header } from '../components/MuiComponents';
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
    isLoading,
    isTable,
  } = useRedux();

  return (
    <>
      <Link to='/'>Back</Link>

      <Header>Redux Tool Kit</Header>
      <br />
      <Form
        handleDelete={handleDelete}
        handelChange={handleOnChange}
        handleSubmit={handleCreateUser}
        handleInputChange={handleOnInputChange}
        data={data}
        users={users}
        selectedID={currentId}
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

export default Redux;
