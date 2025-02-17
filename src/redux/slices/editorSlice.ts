// src/redux/slices/editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  content: string;
  hasUnsavedChanges: boolean;
}

const initialState: EditorState = {
  content: "<p>Start typing...</p>",
  hasUnsavedChanges: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateEditorContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.hasUnsavedChanges = true; // Mark as unsaved
    },
    saveEditorContent: (state) => {
      localStorage.setItem("editorContent", state.content);
      state.hasUnsavedChanges = false; // Mark as saved
    },
    loadEditorContent: (state) => {
      const savedContent = localStorage.getItem("editorContent");
      if (savedContent) {
        state.content = savedContent;
        state.hasUnsavedChanges = false; // Reset unsaved state
      }
    },
  },
});

export const { updateEditorContent, saveEditorContent, loadEditorContent } = editorSlice.actions;
export default editorSlice.reducer;
