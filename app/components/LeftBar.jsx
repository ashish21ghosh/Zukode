import React from "react";
import { TreeItem, TreeView } from "./TreeView/TreeView";

export default function LeftBar(props) {
  const {
    selectedList
  } = props;

  const isExpanded = (nodeId, list) => {
    return list.includes(nodeId);
  }

  const createTree = (data) => {
    return (
      data.map((node) => {
        return createNode(node);
      })
    );
  }

  const createNode = (data) => {
    if (data.nodes) {
      return (
          <TreeItem 
            label={ data.content } 
            key={data.id} 
            nodeId={`${data.id}`}
            isExpanded={isExpanded(data.id, selectedList)}
          >
            {createTree(data.nodes)}
          </TreeItem>
      );
    } else {
      return (
          <TreeItem 
            label={ data.content } 
            key={data.id} 
            nodeId={`${data.id}`} 
          />
      
      )
    }
  }
    const data = props.headData["data"];
    const head = props.headData["head"];

    let content = [];
    if (head) {
      head.map(
        (data_id) => {
          let val = data[data_id];
          content.push(val);

          let nextChild = data[val.child];
          while(nextChild) {
            content.push(nextChild);
            nextChild = data[nextChild.child];
          }
        }
      )
    }

    let itemsToIterate = content.slice(0).reverse();
    
    let level = -1;
    let prev_level = -1;
    let stack = [[]];

    for (let i = 0, len = itemsToIterate.length; i < len; i++) {
      let item = itemsToIterate[i];
      prev_level = level;
      level = item.level;
      if (!stack[level]) {
        stack[level] = [];
      }
      if (prev_level <= level) {
        stack[level].unshift(item);
      } else {
        item.nodes = stack[prev_level];
        stack[prev_level] = [];
        stack[level].unshift(item);
      }

    }
    level = (level === -1) ? 0 : level;
    let tree = createTree(stack[level]);

    return (
      <TreeView
        // className={classes.root}
        // defaultExpanded={[`${HEAD_ID}`]}
        // defaultCollapseIcon={<MinusSquare />}
        // defaultExpandIcon={<PlusSquare />}
        // defaultEndIcon={<CloseSquare />}
        // onNodeToggle={onSelect}
      >
        {tree}
      </TreeView>
    );

}