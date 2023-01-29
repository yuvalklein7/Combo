import { Typography } from "@mui/material";
import { Box, width } from "@mui/system";

export default function About(props) {
    return (
        <Box sx={{ left: '50%', transform: 'translateX(-50%)', top: '15%', position: 'relative', width: '80%', height: '80%', display: "flex", flexDirection: 'column', justifyContent:'space-around' }}>
            <Typography variant="h4">
                A computational tool for engineering the complexity level of combinatorial treatments in clinical trials.
            </Typography>
            <Box sx={{ width: '40%', left: '50%', position: 'relative', transform: 'translateX(-50%)', marginTop: '2%' }}>
                <ul>
                    <li>
                        <Typography variant="h5">
                            Fast and accurate
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="h5">
                            Modern UI
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="h5">
                            Cross-platform compatibility
                        </Typography>
                    </li>
                </ul>
            </Box>
            <Typography variant="h4">
                Contact us:
            </Typography>
            <Typography variant="h5">
                yuvalklein@campus.technion.ac.il
            </Typography>
            <Typography variant="h5">
                shoshisiegel@campus.technion.ac.il
            </Typography>
            <Typography variant="subtitle2">
                    v1.0
            </Typography>
        </Box>
    )
}