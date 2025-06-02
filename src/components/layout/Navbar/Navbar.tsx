import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'
import logo from '@/assets/images/logo.webp'

const Navbar = () => {
    return (
        <Box className="w-full">
            <AppBar position="fixed" className="bg-primary-soxo-red w-full flex items-center justify-center">
                <Toolbar className="w-full max-w-[1560px]">
                    <Box>
                        <Image src={logo} alt="logo" />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
