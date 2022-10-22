import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';

const LoadButton = ({ clickHandler, loading, disable }) => {
    return (
        <Box>
            <LoadingButton
                color="warning"
                onClick={clickHandler}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                fullWidth
                disabled={disable}
            >
                Save
            </LoadingButton>
        </Box >
    );
}

export default LoadButton