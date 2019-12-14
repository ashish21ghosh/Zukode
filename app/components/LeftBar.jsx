import React, { Component } from "react";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Box from '@material-ui/core/Box';

export default class LeftBar extends Component {
  constructor(props){
    super(props);
  }


  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, this);
  };

  createTree = (data) => {
    return (
      data.map((node) => {
        return this.createNode(node);
      })
    );
  }

  createNode = (data) => {
    if (data.nodes) {
      return (
        <TreeItem label={ data.content } key={data.id} nodeId={`${data.id}`}>{this.createTree(data.nodes)}</TreeItem>
      );
    } else {
      return <TreeItem onClick={this.onSelect} label={ data.content } key={data.id} nodeId={`${data.id}`} />
    }
  }


  render() {
    const data = this.props.headData["data"];
    const head = this.props.headData["head"];

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
    let tree = this.createTree(stack[level]);
    return (
      <Box>
      <TreeView
        // showLine
        // switcherIcon={<Icon type="down" />}
        // defaultExpandedKeys={["4"]}
        onNodeToggle={this.onSelect}
      >
        {tree}
      </TreeView>
      </Box>
    );
  }
}