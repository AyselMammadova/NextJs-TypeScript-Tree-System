import React from 'react';
import {RawNodeDatum, TreeNodeDatum} from 'react-d3-tree/lib/types/common';

function bfs (
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

export default bfs;