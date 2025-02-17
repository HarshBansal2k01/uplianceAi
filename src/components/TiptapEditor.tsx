// src/components/TiptapEditor.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  updateEditorContent,
  saveEditorContent,
  loadEditorContent,
} from "../redux/slices/editorSlice";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Box, Button, Typography, IconButton } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const TiptapEditor: React.FC = () => {
  const dispatch = useDispatch();
  const savedContent = useSelector((state: RootState) => state.editor.content);
  const hasUnsavedChanges = useSelector(
    (state: RootState) => state.editor.hasUnsavedChanges
  );
  const [editorContent, setEditorContent] = useState(savedContent);

  useEffect(() => {
    dispatch(loadEditorContent()); // Load content from localStorage
  }, [dispatch]);

  useEffect(() => {
    // Warn if there are unsaved changes when closing the tab
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: editorContent, // Load saved content when initializing
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setEditorContent(newContent);
      dispatch(updateEditorContent(newContent));
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(savedContent); // Load content when Redux updates
    }
  }, [savedContent, editor]);

  if (!editor) return null;

  const handleSave = () => {
    dispatch(saveEditorContent());
    alert("Text content saved!");
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Tiptap Rich Text Editor
      </Typography>
      {/* Toolbar */}
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive("bold") ? "primary" : "default"}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive("italic") ? "primary" : "default"}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive("underline") ? "primary" : "default"}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive("bulletList") ? "primary" : "default"}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive("orderedList") ? "primary" : "default"}
        >
          <FormatListNumberedIcon />
        </IconButton>
      </Box>
      {/* Editor */}
      <EditorContent
        editor={editor}
        style={{
          border: "1px solid #ccc",
          minHeight: "150px",
          padding: "10px",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSave}
      >
        Save Content
      </Button>
    </Box>
  );
};

export default TiptapEditor;
