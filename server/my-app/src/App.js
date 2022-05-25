import React,{useState} from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Bi from './rule/bisection';
import False from './rule/false';
import Cra from './rule/cramer';
import { Typography, Space } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import axios from 'axios';
const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


function App(){
  const [Token,setToken] = useState("");
  //let Token
  axios.post(`http://localhost:5000/login`,{
    "email":"reborntent@gmail.com",
    "password":"caltex09892"
  }).then(res=>{setToken(res.data.accessToken)})
  console.log(Token)
  return(
    <Router>
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Title type="success"level={2}>Numerical method</Title>
      </Menu>
    </Header>
    <Layout>
    <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="บทที่ 1">
            <Menu.Item key="1"><Link to="/Bitsection">Bitsection</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/Falseposition">Falseposition</Link></Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="บทที่2">
            <Menu.Item key="5"><Link to="/Cramer">Cramer_Rule</Link></Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          < Routes>
            <Route exact path='/Bitsection' element = {<Bi Token={Token}/>} />
          </ Routes>
          <Routes>
          <Route exact path='/Falseposition' element = {<False/>} />
          </Routes>
          <Routes>
          <Route exact path='/Cramer' element = {<Cra/>} />
          </Routes>
        </Content>
        
      </Layout>
    </Layout>
    </Layout>
    </Router>
  )
  
}
export default App;