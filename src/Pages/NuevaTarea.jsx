import { useContext, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    TextField,
    MenuItem,
    Snackbar,
    Alert,
    } from "@mui/material";
    import { TaskContext } from "../context/TaskContext";

    export const NuevaTarea = () => {
    const { tasks, setTasks } = useContext(TaskContext);

    // Estados del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pendiente");
    const [priority, setPriority] = useState("media");
    const [dueDate, setDueDate] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSave = () => {
        if (!title) return;

        const newTask = {
        id: tasks.length + 1,
        titulo: title,
        descripcion: description,
        estado: status,
        prioridad: priority,
        fecha_limite: dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        };

        // Actualizar context
        setTasks([...tasks, newTask]);

        // Mostrar alerta
        setOpenSnackbar(true);

        // Limpiar formulario
        setTitle("");
        setDescription("");
        setStatus("pendiente");
        setPriority("media");
        setDueDate("");
    };

    return (
        <div style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>
            Nueva Tarea
        </Typography>

        {/* Formulario */}
        <Grid container spacing={2} marginBottom={3}>
            <Grid item xs={12}>
            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                select
                label="Estado"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="completada">Completada</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={6}>
            <TextField
                select
                label="Prioridad"
                fullWidth
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <MenuItem value="baja">Baja</MenuItem>
                <MenuItem value="media">Media</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Fecha límite"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar Tarea
            </Button>
            </Grid>
        </Grid>

        {/* Lista de tareas */}
        <Grid container spacing={2}>
            {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card>
                <CardContent>
                    <Typography variant="h6">{task.titulo}</Typography>
                    <Typography variant="body2" color="text.secondary">
                    {task.descripcion}
                    </Typography>
                    {task.fecha_limite && (
                    <Typography variant="caption">
                        Fecha límite: {new Date(task.fecha_limite).toLocaleDateString()}
                    </Typography>
                    )}

                    <div>
                    <Chip
                    label={task.estado}
                    color={task.estado === "completada" ? "success" : "warning"}
                    sx={{ mt: 1 }}
                    />
                    </div>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>

        <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
            Tarea guardada correctamente
            </Alert>
        </Snackbar>
        </div>
    );
};
