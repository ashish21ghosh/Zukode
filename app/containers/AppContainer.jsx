import React, { Component } from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
import Coretext from "../components/Coretext";
import 'antd/dist/antd.min.css';
import {
  Layout, Menu, Breadcrumb, Icon, Input,
} from 'antd';
const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      heads: [],
      currentHead: {},
    };
  }

  navHandler = (val) => {
    let head = this.state.heads;
    head.push({
      head: val
    });
    this.setState({
      heads: head,
    });
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/heads').then((response)=>{
      let data = response.data;
      let currentHead = data[data.length - 1];
      this.setState(()=>{
        return {
          heads: data,
          currentHead: currentHead
        }
      })
    });
  }

  render() {
    // left nav
    const heads = this.state.heads.map((item, idx) => (
      <SubMenu key={idx} title={<span><Icon type="laptop" />{item.head}</span>}>
        <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
      </SubMenu>
    ));

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Zukode</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Contact Us</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                {heads}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Coretext 
            nav={this.navHandler}
            currentHead={this.state.currentHead}
            heads={this.state.heads}
            />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Zukode ©2018
        </Footer>
      </Layout>
    )
  }
}