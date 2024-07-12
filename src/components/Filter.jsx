import Table from './Table';

function Filter({
  handleAllButton,
  handleFilterButton,
  handleOnChangeForField,
  handleOnChangeForUniqValue,
  selectedField,
  filteredUser,
  users,
  uniqueValue,
}) {
  function getUniqueValues(field) {
    const uniqueValues = new Set();
    users.forEach((user) => uniqueValues.add(user[field]));
    return Array.from(uniqueValues);
  }

  const uniqueValues =
    selectedField !== null ? getUniqueValues(selectedField) : [];

  return (
    <>
      <select
        onChange={handleOnChangeForField}
        value={selectedField === 'unknown' ? 'unknown' : selectedField}
      >
        <option value='unknown'>Select Field</option>
        {Object.keys(users[0] || {}).map(
          (k) =>
            k !== 'id' && (
              <option key={k} value={k}>
                {k}
              </option>
            )
        )}
      </select>

      {'    '}
      <select
        disabled={selectedField === 'unknown'}
        onChange={handleOnChangeForUniqValue}
        value={uniqueValue === 'unknown' ? 'unknown' : uniqueValue}
      >
        <option value='unknown'>Unique Value</option>
        {uniqueValues.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      {'    '}
      <button onClick={handleFilterButton}>Filter</button>
      {'    '}
      <button onClick={handleAllButton}>All</button>
      <br />
      <br />

      {filteredUser.length > 0 && (
        <Table users={filteredUser} field={Object.keys(users[0])} />
      )}
    </>
  );
}

export default Filter;
