import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WifiRoundedIcon from '@mui/icons-material/Wifi';
import WifiOffRoundedIcon from '@mui/icons-material/WifiOff';
import "../CSS/NavBar.css";
import Tooltip from '@mui/material/Tooltip';
import MyDrawer from "./MyDrawer";

export default function NavBar(props) {
    let [isopen, setIsOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        // Listen to the online status
        window.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);
    return (
        <Box>
            <AppBar className="nav-bar-wrapper">
                <Toolbar className="nav-bar-content" >
                    <Tooltip title='Open Menu'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => { setIsOpen(true) }}
                    >
                        <MenuIcon className="menu-icon" />
                    </IconButton>
                    </Tooltip>
                    <MyDrawer isopen={isopen} setIsOpen={setIsOpen}/>
                    <Typography variant="h4" component="div" >
                        Combo
                    </Typography>
                    <Tooltip title={isOnline ? "Online" : "Offline"}>
                        {isOnline ? <WifiRoundedIcon className="wifi-icon" /> : <WifiOffRoundedIcon className="wifi-icon" />}
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
}





