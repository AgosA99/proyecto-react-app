import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Link } from "react-router-dom";

export const MenuDrawer = ({ isOpenDrawer, setIsOpenDrawer }) => {

    // Lista de items que tendrá el menú
    const menuItems = [
        { text: "Inicio", icon: <HomeIcon />, path:"/" },
        { text: "Buscar tarea", icon: <SearchIcon />, path:"/buscarTarea" },
        { text: "Nueva tarea", icon: <AddTaskIcon />, path:"/nuevaTarea" },
        /*{ text: "Completadas", icon: <CheckCircleIcon /> },
        { text: "Pendientes", icon: <PendingIcon /> }*/
    ];

    return (
        <Drawer 
            anchor="left" 
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link}
                        to={item.path} onClick={() => setIsOpenDrawer(false)}>  
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
}
