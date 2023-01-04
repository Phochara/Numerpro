import React,{useState} from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Bi from './rule/bisection';
import False from './rule/false';
import Cra from './rule/cramer';
import Jor from './rule/jordan';
import One from './rule/onepoint';
import Ja from './rule/jacobi';
import Ga from './rule/seider';
import La from './rule/Lu';
import Con from './rule/conjugate';
import Lag from './rule/Lagrange';
import New from './rule/Newton';
import Sp from './rule/spline';
import Li from './rule/Linear';
import Mu from './rule/Mulinear';
import Po from './rule/Poly';
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
            <Menu.Item key="3"><Link to="/Onepoint">Onepoint_position</Link></Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="บทที่2">
            <Menu.Item key="5"><Link to="/Cramer">Cramer_Rule</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/Jordan">Jordan</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/Jacobi">Jacobi</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/seider">gaussseidel</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/Lu">Lu</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/conjugate">Conjugate</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="บทที่3">
            <Menu.Item key="11"><Link to="/Lagrange">Lagrange</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/Newton">Newton</Link></Menu.Item>
            <Menu.Item key="13"><Link to="/Spline">Spline</Link></Menu.Item>
            <Menu.Item key="14">option12</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<NotificationOutlined />} title="บทที่4">
            <Menu.Item key="15"><Link to="/Linear">Linear</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/Mulinear">MultipleLinear</Link></Menu.Item>
            <Menu.Item key="13"><Link to="/Poly">Polynomial</Link></Menu.Item>
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
          <Route exact path='/Falseposition' element = {<False Token={Token}/>} />
          </Routes>
          <Routes>
          <Route exact path='/Onepoint' element = {<One Token={Token}/>} />
          </Routes>
          <Routes>
          <Route exact path='/Cramer' element = {<Cra/>} />
          </Routes>
          <Routes>
          <Route exact path='/Jordan' element = {<Jor/>} />
          </Routes>
          <Routes>
          <Route exact path='/Jacobi' element = {<Ja/>} />
          </Routes>
          <Routes>
          <Route exact path='/seider' element = {<Ga/>} />
          </Routes>
          <Routes>
          <Route exact path='/Lu' element = {<La/>} />
          </Routes>
          <Routes>
          <Route exact path='/conjugate' element = {<Con/>} />
          </Routes>
          <Routes>
          <Route exact path='/Lagrange' element = {<Lag/>} />
          </Routes>
          <Routes>
          <Route exact path='/Newton' element = {<New/>} />
          </Routes>
          <Routes>
          <Route exact path='/Spline' element = {<Sp/>} />
          </Routes>
          <Routes>
          <Route exact path='/Linear' element = {<Li/>} />
          </Routes>
          <Routes>
          <Route exact path='/Mulinear' element = {<Mu/>} />
          </Routes>
          <Routes>
          <Route exact path='/Poly' element = {<Po/>} />
          </Routes>
        </Content>
        
      </Layout>
    </Layout>
    </Layout>
    </Router>
  )
  
}
export default App;