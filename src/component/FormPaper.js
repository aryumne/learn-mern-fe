import React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const FormPaper = ({ title, children }) => {
    return (
        <Paper square={false} elevation={5} sx={{ width: 700, textAlign: 'center', bgcolor: '#f5f5f5', p: 3 }}>
            <Divider textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h5" textTransform="uppercase" fontWeight={500}>
                    {title}
                </Typography>
            </Divider>
            {children}
        </Paper>
    )
}

export default FormPaper;
