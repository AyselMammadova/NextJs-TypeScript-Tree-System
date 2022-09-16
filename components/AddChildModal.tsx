import React, { useState } from 'react';
import {Modal, Box, Typography, FormControl, TextField, Button} from '@mui/material';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    onSubmit: (memberName: string) => void;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const AddChildModal: React.FC<ModalProps> = ({ 
    open, 
    handleClose, 
    onSubmit 
}) => {

const [memberName, setMemberName] = useState('');
  return (
    <Modal open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">

        <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Kateqoriya əlavə et
            </Typography>
            <FormControl id="modal-modal-description" sx={{width: '100%'}}>
                <TextField
                    id='outlined-basic'
                    variant='outlined'
                    color='success'
                    label='Yeni kateqoriya'
                    sx={{my: 2}}
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                />
                <Button 
                    disabled={!memberName} 
                    variant='contained' 
                    color='success'
                    sx={{p: '12px 16px', width: 'max-content', ml: 'auto'}}
                    onClick={() => {
                        onSubmit(memberName);
                        handleClose();
                    }}>Əlavə et</Button>
            </FormControl>
        </Box>

    </Modal>
  )
}

export default AddChildModal