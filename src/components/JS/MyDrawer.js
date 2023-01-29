import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import "../CSS/MyDrawer.css"
import Divider from '@mui/material/Divider';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import InfoIcon from '@mui/icons-material/Info';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Fragment } from 'react';
import Technion_logo from '../../assets/TechnionLogo.png'
import Faculty from '../../assets/Faculty.png'

import { Link } from "react-router-dom"
export default function MyDrawer(props) {
    const drawerList = [
        // { header: "Home", icon: <HomeIcon />, link: '/' },
        { header: "New API Search", icon: <YoutubeSearchedForIcon />, link: '/' },
        { header: "Favorite Searches", icon: <BookmarksIcon />, link: '/Favorites' },
        { header: "About", icon: <InfoIcon />, link: '/About' }
    ]
    let getItemList = (index) => {
        return (
            <Fragment>
                <Link to={drawerList[index].link}>
                    <ListItemButton onClick={() => props.setIsOpen(false)}>
                        <ListItemIcon className='nav-icon'>
                            {drawerList[index].icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={drawerList[index].header}
                        />
                    </ListItemButton>
                </Link>
                <Divider />
            </Fragment>
        )
    }
    return (
        <Drawer className="left-nav"
            anchor="left"
            open={props.isopen}
            onClose={() => { props.setIsOpen(false) }}
        >
            <List>
                {drawerList.map((val, key) => {
                    return getItemList(key)
                })}
            </List>
            <img src={Technion_logo} className='technion-logo' alt='טכניון-לוגו' />
            <img src={Faculty} className='technion-logo' alt='טכניון-לוגו' />
        </Drawer>)
}