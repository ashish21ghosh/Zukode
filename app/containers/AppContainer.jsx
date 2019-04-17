import React, { Component } from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
import Coretext from "../components/Coretext"
// import antd from "antd";
// import { Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import {
  Layout, Menu, Breadcrumb, Icon, Input,
} from 'antd';
const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;
const { TextArea } = Input;

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      heads: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/heads').then((response)=>{
      console.log(response.data);

      this.setState(()=>{
        return {
          heads: response.data
        }
      })
    });

    axios.get('http://localhost:8000/api/coretext').then((response)=>{
      console.log(response.data);
      this.setState(()=>{
        return {
          items: response.data
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
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item>
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
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
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
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                {heads}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Coretext />
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