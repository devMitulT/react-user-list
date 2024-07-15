import { TableComp, Thead, TC, TR, TBody } from './MuiComponents';

function Table({ users, field }) {
  return (
    <TableComp border='1px'>
      <Thead>
        <TR>
          {field.map((heading) => (
            <TC key={heading}>{heading.toUpperCase()}</TC>
          ))}
        </TR>
      </Thead>
      <TBody>
        {users.map((user) => (
          <TR key={user.id}>
            {field.map((key) => (
              <TC key={key}>{user[key]}</TC>
            ))}
          </TR>
        ))}
      </TBody>
    </TableComp>
  );
}

export default Table;
