import React from 'react'

import { Modal, Box, Button, TextField, Typography} from '@mui/material'
import { useSelector } from 'react-redux'

export default function UserModal({open, handleClose}) {
    const user = useSelector(state => state.user)

    return (
        <Modal open={open}  onClose={handleClose}>
            <Box className="modalBox">
                <Typography>{user.name}</Typography>  
            </Box>
        </Modal>
    )
}
