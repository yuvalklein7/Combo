import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from "@mui/material";

export default function KeyMes(props) {
    const list_font_size = '3vh'

    return (
        <List >
            <ListItemText primaryTypographyProps={{ fontSize: list_font_size }}>Total # of Studies: {props.totslStudies}</ListItemText>
            <Divider />
            <ListItemText primaryTypographyProps={{ fontSize: list_font_size }}>Retrieved Studies: {props.retStudies - props.yearsFiltered}</ListItemText>
            <Divider />
            <ListItemText primaryTypographyProps={{ fontSize: list_font_size }}>Years: {props.years[0]} to {props.years[1]}</ListItemText>
            <Divider />
            <ListItemText primaryTypographyProps={{ fontSize: list_font_size }}>Time to Retrieve (s): {props.retTime / 1000}</ListItemText>
            <Divider />
        </List>
    )

}