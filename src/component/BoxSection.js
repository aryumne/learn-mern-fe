import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react'

const BoxSection = ({ children }) => {
    return (
        <Box>
            <Container maxWidth="lg" sx={{ pt: 2 }}>
                {children}
            </Container>
        </Box>
    )
}

export default BoxSection