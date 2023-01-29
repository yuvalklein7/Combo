import { Typography } from "@mui/material";
import '../CSS/HomePage.css'
import Button from '@mui/material/Button'
import StartIcon from '@mui/icons-material/Start';
import searchImg from '../../assets/3090011.png'
import healthImg from '../../assets/health.png'
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/JS/SearchBar";
import { useState } from "react";
import electronImg from '../../assets/Picture1.png'
import nodeImg from '../../assets/Picture2.png'
import muiImg from '../../assets/Picture3.png'
import reactImg from '../../assets/Picture4.png'
import clinicalTrialsImg from '../../assets/Picture5.png'

export default function HomePage(props) {
    const navigate = useNavigate();
    const [value, setValue] = useState('')
    let goToSearch = (searchVal,years) => {
        if (searchVal !== null && searchVal !== '')
            navigate(`/Search=${searchVal}`, { replace: true, state: years })
    }
    return (
        <div className="home-wrapper">
            <div className="home-content-wrapper">
                <div className="home-header">
                    <Typography variant="h3" sx={{ fontWeight: "bold", width: 'fit-content', color: 'rgba(0,0,0,0.8)' }} >
                        Combination-Therapy
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: "bold", width: 'fit-content', color: 'rgb(156,39,176)' }} >
                        Analysis Tool
                    </Typography>
                </div>
                <div className="home-content">
                    <Typography variant="h4">
                        A computational tool for engineering the complexity level of combinatorial treatments in clinical trials
                    </Typography>
                </div>
                <div className="home-actions">
                    <div className="start-button">
                        <Button variant="contained" color="secondary" style={{ justifyContent: "space-between" }}
                            sx={{ width: '100%' }} endIcon={<StartIcon />} size='large' onClick={() => { navigate('/NewSearch') }}>Get Started</Button>
                    </div>
                    <div className='search-section-home'>
                        <SearchBar goToSearch={goToSearch} value={value} setValue={setValue}  />
                    </div>
                </div>
            </div>
            <div className="home-page-decor-section">
                <div className="decor-img1">
                    <img src={searchImg} />
                    <Typography variant="overline">Search Faster</Typography>
                </div>
                <div className="decor-img2">
                <img src={healthImg} />
                    <Typography variant="overline">Treat Better</Typography>
                </div>
                <div className="decor-assets">
                    <img src={electronImg}/>
                    <img src={nodeImg}/>
                    <img src={muiImg}/>
                    <img src={reactImg}/>
                    <img src={clinicalTrialsImg}/>
                </div>
            </div >
        </div>
    )
}