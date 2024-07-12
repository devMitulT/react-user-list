import Form from '../components/Form';
import Filter from '../components/Filter';

import { useStates } from '../hooks/useStates';

function State() {
  const [
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
  ] = useStates();

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
