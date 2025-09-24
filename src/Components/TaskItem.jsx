import { ListItem, Checkbox, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const TaskItem = ({task}) => () {
    return (
    <ListItem
        secondaryAction={
        <>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
            <EditIcon />
            </IconButton>
            <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(task.id)}
            >
            <DeleteIcon />
            </IconButton>
        </>
        }
    >
        <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        />
        <ListItemText
        primary={task.title}
        sx={{ textDecoration: task.completed ? "line-through" : "none" }}
        />
    </ListItem>
    );
}
