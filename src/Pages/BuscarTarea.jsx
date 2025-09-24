import { useContext, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Chip,
    TextField,
    } from "@mui/material";
    import { TaskContext } from "../context/TaskContext";

    export const BuscarTarea = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const [searchText, setSearchText] = useState("");

    // Filtrado según el input
    const filteredTasks = tasks.filter(
        (task) =>
        task.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
        (task.descripcion && task.descripcion.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <div style={{ padding: 20 }}>
        {/* Buscador */}
        <TextField
            label="Buscar tarea"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            margin="normal"
        />

        {/* Mostrar tareas filtradas */}
        <Grid container spacing={2}>
            {filteredTasks.map((task) => (
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
        </div>
    );
};
