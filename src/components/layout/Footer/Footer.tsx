import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const Footer = () => {
    return (
        <Box className="w-full h-[60px] bg-black flex justify-center items-center text-white">
            <Box className="w-full max-w-[1560px] flex justify-center items-center">
                <Typography className="text-sm font-medium">
                    Recruitment task for the SOXO company {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
