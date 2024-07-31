import Table from './Table';
import { Button, Select, Option, Loader } from './MuiComponents';
import { Grid, Box } from '@mui/material';

function Filter({
  handleAllButton,
  handleFilterButton,
  handleOnChangeForField,
  handleOnChangeForUniqValue,
  selectedField,
  filteredUser,
  users,
  uniqueValue,
  isTable,
}) {
  function getUniqueValues(field) {
    const uniqueValues = new Set();
    users.forEach((user) => uniqueValues.add(user[field]));
    return Array.from(uniqueValues);
  }

  const uniqueValues =
    selectedField !== null ? getUniqueValues(selectedField) : [];

  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <br />
      <Box sx={{}}>
        <Select
          onChange={handleOnChangeForField}
          value={selectedField === 'unknown' ? 'unknown' : selectedField}
        >
          <Option value='unknown'>Select Field</Option>
          {Object.keys(users[0] || {}).map(
            (key) =>
              key !== 'id' && (
                <Option key={key} value={key}>
                  {key.toLocaleUpperCase()}
                </Option>
              )
          )}
        </Select>

        <Select
          disabled={selectedField === 'unknown'}
          onChange={handleOnChangeForUniqValue}
          value={uniqueValue === 'unknown' ? 'unknown' : uniqueValue}
        >
          <Option value='unknown'>Unique Value</Option>
          {uniqueValues.map((value, index) => (
            <Option key={index} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </Box>

      <Box>
        <Button onClick={handleFilterButton}>Filter</Button>

        <Button onClick={handleAllButton}>All</Button>
      </Box>

      {isTable && <Loader />}

      {filteredUser.length > 0 && !isTable && (
        <Table users={filteredUser} field={Object.keys(users[0])} />
      )}
    </Grid>
  );
}

export default Filter;
