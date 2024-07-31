import Form from '../components/Form';
import Filter from '../components/Filter';

import { useStates } from '../hooks/useStates';
import { Header } from '../components/MuiComponents';
import { Link } from 'react-router-dom';

function State() {
  const {
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
  } = useStates();

  return (
    <>
      <Link to='/'>Back</Link>

      <Header>Using useState Hook </Header>
      <br />
      <Form
        handleDelete={handleDelete}
        handelChange={handelChange}
        handleSubmit={handleSubmit}
        data={data}
        users={users}
        selectedID={selectedID}
        handleInputChange={handleOnInputChange}
        isLoading={isLoading}
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
        isTable={isTable}
      />
      <br />
    </>
  );
}

export default State;
