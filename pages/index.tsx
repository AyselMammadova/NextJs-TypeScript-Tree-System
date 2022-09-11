import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {RawNodeDatum} from 'react-d3-tree/lib/types/common';
import {Box, Button} from '@mui/material'
import AddChildModal from '../components/AddChildModal';

const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false
});

interface HomeProps {}


const Home: React.FC<HomeProps> = () => {

    const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]> ({
      name: 'Ana kateqoriya',
      children: []
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (name: string) => {};


  return (

    <Box width='100vw' height='100vh'>
      <Tree data={tree} />
      <Button onClick={handleOpen} aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">Open modal</Button>
      <AddChildModal open={open} handleClose={handleClose} onSubmit={handleSubmit}/>
    </Box>

  )
}

export default Home;

