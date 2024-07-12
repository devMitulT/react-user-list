import { useReducer, createContext, useContext } from 'react';
import { userConst } from './userConst';

const UserContext = createContext();

const initialState = {
  users: [],
  currentId: 0,
  currentField: 'unknown',
  currentUniqueValue: 'unknown',
};

function update(arr, id, updatedData) {
  return arr.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
}

function del(arr, id) {
  return arr.filter((item) => item.id !== id);
}

function reducer(state, action) {
  switch (action.type) {
    case userConst.SAVE:
      return {
        ...state,
        users: [...state.users, action.payload],
        currentId: 0,
      };
    case userConst.SELECT_ID:
      return { ...state, currentId: action.payload };

    case userConst.UPDATE:
      const updatedUser = update(state.users, state.currentId, action.payload);

      return { ...state, users: updatedUser, currentId: 0 };

    case userConst.DELETE:
      const deletedUSers = del(state.users, state.currentId);

      return { ...state, users: [...deletedUSers], currentId: 0 };

    case userConst.SELECT_FIELD:
      return {
        ...state,
        currentField: action.payload,
        currentUniqueValue: 'unknown',
      };

    case userConst.SELECT_UNIQUE:
      return { ...state, currentUniqueValue: action.payload };

    default:
      alert('Invalid action');
  }
}

function UsersProvider({ children }) {
  const [{ users, currentId, currentField, currentUniqueValue }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        users,
        dispatch,
        currentId,
        currentField,
        currentUniqueValue,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('UserContext was used outside the CitiesProvider');
  return context;
}

export { UsersProvider, useUsers };
