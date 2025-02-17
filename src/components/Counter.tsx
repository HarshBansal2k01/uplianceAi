import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { increment, decrement, reset } from "../redux/slices/counterSlice";
import { Button, Box, Typography } from "@mui/material";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  // Calculate background color intensity using a linear function (scaled 0-255)
  const bgColor = `rgb(${Math.min(count * 10, 255)}, ${Math.min(
    count * 5,
    255
  )}, 255)`;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Counter: {count}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(reset())}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;
