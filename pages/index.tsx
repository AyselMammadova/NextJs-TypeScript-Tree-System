import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {RawNodeDatum, TreeNodeDatum} from 'react-d3-tree/lib/types/common';
import {Box} from '@mui/material'
import AddChildModal from '../components/AddChildModal';
import treeStyle from '../styles/Tree.module.css'


const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false
});

interface HomeProps {
  
}


const Home: React.FC<HomeProps> = () => {

    const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]> ({
      name: 'Ana kateqoriya',
      children: []
    });

    const [node, setNode] = useState<TreeNodeDatum | undefined>(undefined);
    const handleOpen = (datum: any) => setNode(datum);
    const handleClose = () => setNode(undefined);
    const handleSubmit = (memberName: string) => {

      const newTree = bfs(node!.name, tree, memberName);

      if(newTree) {
        setTree(newTree);
      }

    };


  return (

    <Box width='100vw' height='100vh'>
      <Tree data={tree} 
        translate={{
          x: 200,
          y: 200
        }}
        rootNodeClassName={treeStyle.node__root}
        branchNodeClassName={treeStyle.node__branch}
        leafNodeClassName={treeStyle.node__leaf}
        onNodeClick={handleOpen} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
      />
      <AddChildModal 
        open={Boolean(node)} 
        handleClose={handleClose} 
        onSubmit={handleSubmit}
      />
    </Box>

  )
};


function bfs(
  name: string, 
  tree: RawNodeDatum | RawNodeDatum[],
  newNodeName: string
) {

  const queue: RawNodeDatum[] = [];

  queue.unshift(tree as RawNodeDatum);

  while(queue.length > 0) {
    const curNode = queue.pop();

    if(curNode?.name === name) {
      curNode?.children?.push({
        name: newNodeName,
        children: []
      });

      return {...tree};
    }

    const len = curNode?.children?.length;

    if(len && curNode.children) {
      for (let i = 0; i < len; i ++) {
        queue.unshift(curNode.children[i]);
      }
    }
  }
}

export default Home;

