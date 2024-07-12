import { createSlice } from '@reduxjs/toolkit';

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
      state.currentId = 0;
    },
    updateUser: (state, action) => {
      const newUser = update(state.users, state.currentId, action.payload);
      state.users = newUser;
      state.currentId = 0;
    },
    deleteUser: (state) => {
      state.users = state.users.filter((user) => user.id !== state.currentId);
      state.currentId = 0;
    },
    selectId: (state, action) => {
      state.currentId = action.payload;
    },
    selectField: (state, action) => {
      state.currentField = action.payload;
      state.currentUniqueValue = 'unknown';
    },
    selectValue: (state, action) => {
      state.currentUniqueValue = action.payload;
    },
  },
});

export const {
  addUser,
  selectId,
  updateUser,
  deleteUser,
  selectField,
  selectValue,
} = userSlice.actions;

export default userSlice.reducer;
