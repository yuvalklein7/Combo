import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom"

export default function FavoriteCard(props) {
    const navigate=useNavigate()
    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
                        {props.item.subject.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => { props.setIsFav(false) }} aria-label="settings">
                        <BookmarkAddIcon fontSize="large" color="primary" />
                    </IconButton>
                }
                title={<Typography variant="h6" color="text.primary">
                    {props.item.subject}
                </Typography>}
                subheader={props.item.seTime}
            />
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    Total # of Studies: {props.item.keyMes.studiesNum}, Retrieved Studies: {props.item.keyMes.studiesRet} <br/>
                     Time to Retrieve (s): {props.item.keyMes.studiesRet}, Years: {props.item.years[0]} to {props.item.years[1]} <br />
                    Most occured drug(s): {props.item.keyMes.mostOcc.drugs}, # of occurance: {props.item.keyMes.mostOcc.occurance}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" onClick={()=>navigate(`../Search=${props.item.subject}`, { replace: true,state:props.item })}>Show all</Button>
            </CardActions>
        </Card>
    )
}