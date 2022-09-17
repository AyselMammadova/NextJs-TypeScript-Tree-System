import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {CustomNodeElementProps, RawNodeDatum, TreeNodeDatum} from 'react-d3-tree/lib/types/common';
import {Box, Typography} from '@mui/material';
import AddChildModal from '../components/AddChildModal';
import { v4 } from 'uuid';


const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false
});


export function bfs(
  id: string | number | boolean, 
  tree: RawNodeDatum | RawNodeDatum[],
  node: RawNodeDatum
) {

  const queue: RawNodeDatum[] = [];

  queue.unshift(tree as RawNodeDatum);

  while(queue.length > 0) {
    const curNode = queue.pop();

    if(curNode!.attributes?.id === id) {
      curNode!.children?.push(node);

      return {...tree};
    }

    const len = curNode!.children?.length;

    if(len && curNode!.children) {
      for (let i = 0; i < len; i ++) {
        queue.unshift(curNode!.children[i]);
      }
    }
  }
}


export default function Home() {

    const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]> ({
      name: 'A',
      attributes: {
        id: '411d63636-57aa-23f5'
      },
      children: [
        {
          name: 'A1',
          attributes: {
            id: '411d63636-57aa-23f52'
          },
          children: [
            {
              name: 'A1.1',
              attributes: {
                id: '411d63636-57aa-23f54'
              }, 
              children: [
                {
                  name: 'A1.11',
                  attributes: {
                    id: '411d63636-57aa-23f55'
                  }, 
                  children: []
                }
              ]
            },
            {
              name: 'A1.2',
              attributes: {
                id: '411d63636-57aa-23f56'
              }, 
              children: []
            }
          ]
        },
        {
          name: 'A2',
          attributes: {
            id: '411d63636-57aa-23f53'
          }, 
          children: []
        }
      ]
    });

    const [node, setNode] = useState<TreeNodeDatum | undefined>();

    const handleOpen = (datum: TreeNodeDatum) => {
      setNode(datum);
    };

    console.log(node);
    
    const handleClose = () => setNode(undefined);

    const handleSubmit = (memberName: string) => {

      const newTree = bfs(node!.attributes!.id, tree, {
        name: memberName,
        attributes: {
          id: v4()
        },
        children: []

      });

      if(newTree) {
        setTree(newTree);
      }

      setNode(undefined);

    };

    const renderRectSvgNode = (
      customProps: CustomNodeElementProps,
      click: (datum: TreeNodeDatum) => void
    ) => {
      const { nodeDatum } = customProps;
  
      return (
        <g>
          <circle r="15" fill={"green"} onClick={() => click(nodeDatum)} />
          <text fill="black" strokeWidth="0.5" x="20" y="-5">
            {nodeDatum.name}
          </text>
        </g>
      );
    };


  return (

    <Box width='100vw' height='100vh'>

      <Typography variant='h5' align='center' sx={{mt: 4, mb: 1, color: 'green'}}>
        Öz BFS (Breadth First Search) ağac sistemini qur
      </Typography>

      <Typography paragraph={true} align='center' sx={{mb: 2}}>
        Node-ların üzərinə klikləyərək yeni element yarada bilərsən
      </Typography>

      <Tree data={tree} 
        zoomable={true}
        translate={{
          x: 200,
          y: 200
        }}
        renderCustomNodeElement={(nodeInfo) =>
          renderRectSvgNode(nodeInfo, handleOpen)
        }
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


