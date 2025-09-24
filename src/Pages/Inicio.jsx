import { useContext, useState } from "react";
import { Grid, Card, CardContent, Typography, CardActions, Button, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem } from "@mui/material";
import { TaskContext } from "../context/TaskContext";

export const Inicio = () => {
    
    const { tasks, setTasks } = useContext(TaskContext);

    //State eliminar
    const [openDelete, setOpenDelete] = useState (false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    //State editar 
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editPriority, setEditPriority] = useState("");
    const [editDueDate, setEditDueDate] = useState("");  



    //Eliminar 
    const handleDelete = (task) => {
        setTaskToDelete(task);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
        setOpenDelete(false);
        setTaskToDelete(null);
    }

    const cancelDelete = () => {
        setOpenDelete(false);
        setTaskToDelete(null);
    }

    //Editar
    const handleEditClick = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.estado);
    setEditPriority(task.prioridad);
    setEditDueDate(task.fecha_limite ? task.fecha_limite.split("T")[0] : "");
    setOpenEdit(true); 
    };

    const saveEdit = () => {
        setTasks(
            tasks.map((t) =>
                t.id === editId
                ? { ...t,
                    titulo: editTitle, descripcion: editDescription, 
                    estado: editStatus,
                    prioridad: editPriority,
                    fecha_limite: editDueDate,
                    updatedAt: new Date().toISOString() }
                : t
            )
        );
        setOpenEdit(false); // cerrar diálogo
        setEditId(null); // close edit mode
    };

    return (
        <Grid container spacing={2} padding={2}>
        {tasks.map((tarea) => (
            <Grid item xs={12} sm={6} md={4} key={tarea.id}>
            <Card>
                <CardContent onClick={() => handleEditClick(tarea)} style={{ cursor: "pointer" }}>
                <Typography variant="h6">{tarea.titulo}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {tarea.descripcion}
                </Typography>

                {tarea.fecha_limite && (
                    <Typography variant="caption" className="block mt-2">
                    Fecha límite: {new Date(tarea.fecha_limite).toLocaleDateString()}
                    </Typography>
                )}

                <div>
                    <Chip
                    label={tarea.estado}
                    color={tarea.estado === "completada" ? "success" : "warning"}
                    sx={{ mt: 1 }}
                    />
                </div>
                </CardContent>

                <CardActions>
                <Button size="small" onClick={() => handleEditClick(tarea)}>Editar</Button>
                <Button size="small" color="error" onClick={() => handleDelete(tarea)}>
                    Eliminar
                </Button>
                </CardActions>
            </Card>
            </Grid>
        ))}



        <Dialog open={openDelete} onClose={cancelDelete}>
            <DialogTitle>Eliminar Tarea</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Estas seguro que quieres eliminar esta tarea{" "}
                <strong>{taskToDelete?.titulo}</strong>?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={cancelDelete}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>



        {/* Edit dialog */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
            <DialogTitle>Editar Tarea</DialogTitle>
            <DialogContent>
            <TextField
                label="Título"
                fullWidth
                margin="dense"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField
                label="Descripción"
                fullWidth
                margin="dense"
                multiline
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
            />
            <TextField
                select
                label="Estado"
                fullWidth
                margin="dense"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
            >
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="completada">Completada</MenuItem>
            </TextField>
            <TextField
                select
                label="Prioridad"
                fullWidth
                margin="dense"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
            >
                <MenuItem value="baja">Baja</MenuItem>
                <MenuItem value="media">Media</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
            </TextField>
            <TextField
                label="Fecha límite"
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={saveEdit} variant="contained">
                Save
            </Button>
            </DialogActions>
        </Dialog>

        </Grid>
    );
};
