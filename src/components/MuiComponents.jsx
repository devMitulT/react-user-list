import { TextField as InputComponent } from '@mui/material';
import { FormLabel } from '@mui/material';
import { Button as ButtonComp } from '@mui/material';
import { Select as SelectComponent } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead, TableBody } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';


const Input = (props) => {
  return <InputComponent size="string" variant='standard' {...props} />;
};

const Label = (props) => {
  return <FormLabel {...props} />;
};

const Button = (props) => {
  return <ButtonComp {...props} />;
};

const Select = (props) => {
  return <SelectComponent variant='standard' {...props} />;
};

const Option = (props) => {
  return <MenuItem {...props} />;
};

const Form1 = (props) => {
  return <FormControl {...props} />;
};

const TableComp = (props) => {
  return <Table sx={{ minWidth: 650 }} aria-label="simple table" {...props} />;
};

const Thead = (props) => {
  return <TableHead {...props} />;
};
const TBody = (props) => {
  return <TableBody {...props} />;
};

const TR = (props) => {
  return <TableRow {...props} />;
};

const TC = (props) => {
  return <TableCell align="center" {...props} />;
};
export {
  Input,
  Label,
  Button,
  Select,
  Option,
  Form1,
  TableComp,
  Thead,
  TR,
  TC,
  TBody,
};
