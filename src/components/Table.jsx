function Table({ users, field }) {
  return (
    <table border='1px'>
      <thead>
        <tr>
          {field.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {field.map((key) => (
              <td key={key}>{user[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
