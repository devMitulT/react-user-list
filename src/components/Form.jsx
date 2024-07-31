import { Button, Select, Option, Input, Form1, Loader } from './MuiComponents';
import { Paper, Grid, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function Form({
  handleSubmit,
  data,
  selectedID,
  handelChange,
  users,
  handleDelete,
  handleInputChange,
  isLoading,
}) {
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Paper elevation={5}>
        <Box
          sx={{
            padding: '0px 20px',
            bgcolor: '	rgb(224,224,224)',
          }}
        >
          <Form1>
            <Input
              label='Name'
              type='text'
              name='name'
              value={data.name}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <Input
              label='City'
              type='text'
              name='city'
              value={data.city}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <Input
              label='Age'
              type='number'
              name='age'
              value={data.age}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <Loader
                  size={25}
                  color='success'
                  sx={{ color: 'rgb(224,224,224)' }}
                />
              ) : selectedID === 0 ? (
                'Save'
              ) : (
                'Update'
              )}
            </Button>

            <br />
            <br />
          </Form1>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', padding: '10px' }}>
        <Select
          onChange={handelChange}
          value={selectedID !== 0 ? selectedID : 0}
        >
          <Option value={0}>Select Based on ID</Option>
          {users.length > 0 &&
            users.map((user) => (
              <Option value={user.id} key={user.id}>
                {user.id}
              </Option>
            ))}
        </Select>

        <Button
          disabled={selectedID === 0}
          variant='contained'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Grid>
  );
}

export default Form;
