import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import '../CSS/PopperContent.css'
export default function PopperContent(props) {
    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };
    return (
        <div className='slider-content'>
            <span className='slider-title'>
                <Typography>
                    Years
                </Typography>
            </span>
            <Slider
                size='small'
                min={1980}
                max={2040}
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </div>

    )
}