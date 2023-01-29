import { useState, useEffect } from 'react';
import "../CSS/NewSearch.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom"
import { Typography } from '@mui/material';
import searchHistory from "../../assets/HistorySearches.json";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SearchBar from '../../components/JS/SearchBar';
import { channels } from '../../shared/channels';
const { ipcRenderer } = window.require('electron');
export default function NewSearch(props) {
    const [value, setValue] = useState(null);
    const navigate = useNavigate();

    let goToSearch = (searchVal, years) => {
        if (searchVal !== null && searchVal !== '') {
            sendHistory(searchVal,years);
            navigate(`../Search=${searchVal}`, { replace: true, state: years })
        }
    }

    const sendHistory = (val,years) => {
        ipcRenderer.send(channels.SendHistory, { addHistory:{val:val,years:years} });
    }

    return (
        <div className='new-search-wrapper'>
            <div className='new-search-section'>
                <span className='new-search-header'>
                    <Typography variant='h3'>Enter New Query:</Typography>
                </span>
                <span className='search-section'>
                    <SearchBar goToSearch={goToSearch} value={value} setValue={setValue} />
                </span>
            </div>
            <div className='history-searches'>
                {searchHistory.searches.map((v, k) => {
                    return (
                        <span className='history-card'>
                            <Card>
                                <IconButton className='delete-card' size='small' ><CloseIcon fontSize='small' color='inherit' /></IconButton>
                                <CardContent>
                                    <Typography className='card-date' color="text.secondary">
                                        {v.date}
                                    </Typography>
                                    <Typography className='card-value'>
                                        {v.value}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => { goToSearch(v.value, v.years) }}>search</Button>
                                </CardActions>
                            </Card>

                        </span>
                    )
                })}
            </div>
        </div>
    )
}

