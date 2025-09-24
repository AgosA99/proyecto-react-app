import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title);
    setTitle("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            <TextField
            label="Nueva tarea"
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mr: 1 }}
            />
            <Button type="submit" variant="contained">
                Agregar
            </Button>
    </Box>
  );
};
