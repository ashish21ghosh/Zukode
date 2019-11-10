import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {
    Layout, Tree, Icon, Menu
  } from 'antd';
const { TreeNode } = Tree;
const {
    Sider,
  } = Layout;

const { SubMenu } = Menu;

export default class LeftBar extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   headData: {},
    // };
        // this.editPageData = this.editPageData.bind(this);
  }

  // componentDidMount(){
  //   axios.get('http://localhost:8000/api/corehead').then((response)=>{
  //     console.log('api/corehead',response.data);
  //     this.setState(()=>{
  //       return {
  //         headData: response.data
  //       }
  //     })
  //   });
  // }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  createTree = (data) => {
    return (
      // <TreeNode title={ data.content } key={data.id}>
          data.map((node) => {
            return this.createNode(node);
          })
      // </TreeNode>
    );
}

createNode = (data) => {
    if (data.nodes) {
        return (
        <TreeNode title={ data.content } key={data.id}>{this.createTree(data.nodes)}</TreeNode>
    );
    } else {
        return <TreeNode title={ data.content } key={data.id} />
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
      <Sider width={200} style={{ background: '#fff' }}>
      <Tree
        // showLine
        switcherIcon={<Icon type="down" />}
        defaultExpandedKeys={["4"]}
        onSelect={this.onSelect}
      >
        {tree}
      </Tree>

      </Sider>
    )
  }
}