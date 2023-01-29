import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { OpenInNew } from '@mui/icons-material';
import { Fragment } from "react";

export default function Trialsmodal(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '42vw',
        height: '75vh',
        boxShadow: 24,
        bgcolor: 'white',
        p: 4,
        borderRadius: '20px',
        justifyContent: 'center',
        overflow:'auto'
    };
    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)} >
            <Box sx={style}>
                <Typography variant="h5" sx={{ position: 'relative', width: 'fit-content', left: '50%', transform: 'translateX(-50%)' }} >
                    {props.drugs}
                </Typography>
                <Divider />
                {props.data.length > 0 ?
                    <List>
                        {props.data.map((v, k) => {
                            return (
                                <Fragment>
                                    <ListItem secondaryAction={<IconButton onClick={()=>{ window.open(`https://clinicaltrials.gov/ct2/show/${v[0]}`)}}><OpenInNew /></IconButton>}>
                                        <ListItemText primary={<Typography variant="subtitle1">{v[1]}</Typography>} />
                                    </ListItem>
                                    <Divider />
                                </Fragment>)
                        })}
                    </List>
                    :
                    <div />}
            </Box>
        </Modal>
    )
}
