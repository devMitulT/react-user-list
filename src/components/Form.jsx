// function Form({
//   handleSubmit,
//   data,
//   selectedID,
//   handelChange,
//   users,
//   handleDelete,
//  key = `some `
// }) {
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>Name : </label>
//         <input type='text' name='name' defaultValue={data.name} />
//         <br />
//         <br />

//         <label> City : </label>
//         <input type='text' name='city' defaultValue={data.city} />
//         <br />
//         <br />

//         <label> Age : </label>
//         <input type='number' name='age' defaultValue={data.age} />
//         <br />
//         <br />

//         <button type='submit'> {selectedID === 0 ? 'Save' : 'Update'} </button>
//         <br />
//         <br />
//       </form>

//       <select onChange={handelChange} defaultValue={selectedID}>
//         <option value={0}>Select Based on ID</option>
//         {users.length > 0 &&
//           users.map((user) => (
//             <option value={user.id} key={user.id}>
//               {user.id}
//             </option>
//           ))}
//       </select>
//       {'    '}
//       <button disabled={selectedID === 0} onClick={handleDelete}>
//         Delete
//       </button>
//     </>
//   );
// }

// export default Form;

function Form({
  handleSubmit,
  data,
  selectedID,
  handelChange,
  users,
  handleDelete,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input type='text' name='name' defaultValue={data.name} />
        <br />
        <br />

        <label>City : </label>
        <input type='text' name='city' defaultValue={data.city} />
        <br />
        <br />

        <label>Age : </label>
        <input type='number' name='age' defaultValue={data.age} />
        <br />
        <br />

        <button type='submit'> {selectedID === 0 ? 'Save' : 'Update'} </button>
        <br />
        <br />
      </form>

      <select onChange={handelChange} value={selectedID !== 0 ? selectedID : 0}>
        <option value={0}>Select Based on ID</option>
        {users.length > 0 &&
          users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.id}
            </option>
          ))}
      </select>
      {'    '}
      <button disabled={selectedID === 0} onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}

export default Form;
