import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

export default class LeftBar extends Component {
  constructor(props){
    super(props);
  }


  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
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
      return <TreeItem label={ data.content } key={data.id} nodeId={`${data.id}`} />
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

    let tree = this.createTree(stack[0]);
    return (
      <TreeView
        // showLine
        // switcherIcon={<Icon type="down" />}
        // defaultExpandedKeys={["4"]}
        // onSelect={this.onSelect}
      >
        {tree}
      </TreeView>
    );
  }
}