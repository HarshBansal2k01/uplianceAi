// src/components/UserForm.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateField, saveUser, loadUser } from "../redux/slices/userSlice";
import { Box, TextField, Button, Typography } from "@mui/material";

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(loadUser());
    
    // Warn if there are unsaved changes
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (user.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, user.hasUnsavedChanges]);

  const handleChange = (field: string, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSave = () => {
    dispatch(saveUser());
    alert("User data saved!");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Form
      </Typography>
      <Typography variant="body2" color="textSecondary">
        User ID: {user.id}
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={user.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <TextField
        label="Address"
        fullWidth
        margin="normal"
        value={user.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={user.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <TextField
        label="Phone"
        type="tel"
        fullWidth
        margin="normal"
        value={user.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default UserForm;
