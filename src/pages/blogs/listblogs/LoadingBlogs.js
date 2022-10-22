import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


export default function LoadingBlogs() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return list.map((l) => (
        <Grid key={l} item lg={4} xs={12} md={6}>
            <Skeleton variant="rounded" animation='wave' width='100%' height={200} />
            <Box sx={{ pt: 1 }}>
                <Skeleton variant="text" animation='wave' width='100%' height={30} />
                <Skeleton variant="text" animation='wave' width='70%' height={30} />
            </Box>
        </Grid>
    ));
}
