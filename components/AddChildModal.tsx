import React, { useState } from 'react';
import {Modal, Box, Typography, FormControl, InputLabel, Input, Button} from '@mui/material';

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

const inputStyle = {
    bgcolor: 'white',
    margin: '15px 0',
    border: '2px solid #000'
}

const AddChildModal: React.FC<ModalProps> = ({ 
    open, 
    handleClose, 
    onSubmit 
}) => {

const [name, setName] = useState('');
  return (
    <Modal open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">

        <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Kateqoriya əlavə et
            </Typography>
            <FormControl id="modal-modal-description">
                <InputLabel htmlFor="my-input" 
                    sx={{transformOrigin: 'center left'}}>
                    Yeni kateqoriya
                </InputLabel>
                <Input id="my-input" 
                    sx={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button disabled={!name} variant='contained' onClick={() => onSubmit(name)}>Əlavə et</Button>
            </FormControl>
        </Box>

    </Modal>
  )
}

export default AddChildModal