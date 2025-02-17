import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  hasUnsavedChanges: boolean;
}

const generateUserId = () => `user-${Math.random().toString(36).substr(2, 9)}`;

const initialState: UserState = {
  id: generateUserId(),
  name: "",
  address: "",
  email: "",
  phone: "",
  hasUnsavedChanges: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      (state as any)[action.payload.field] = action.payload.value;
      state.hasUnsavedChanges = true;
    },
    saveUser: (state) => {
      localStorage.setItem("userData", JSON.stringify(state));
      state.hasUnsavedChanges = false;
    },
    loadUser: (state) => {
      const savedUser = localStorage.getItem("userData");
      if (savedUser) {
        const parsedData = JSON.parse(savedUser);
        return { ...parsedData, hasUnsavedChanges: false };
      }
    },
  },
});

export const { updateField, saveUser, loadUser } =
  userSlice.actions;
export default userSlice.reducer;
