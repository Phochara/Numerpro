import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { rightArithShift } from 'mathjs';
import { LineChart, Line } from 'recharts';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const math = require('mathjs')
const data = [
  {
    name: "Page A",
    uv: 3000,
    pv: 2500,
    amt: 1000
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }]

export default class PersonList extends React.Component {
  constructor(props){
    super(props)
    this.bisec=this.bisec.bind(this)
    this.func=this.func.bind(this)
    this.state = {
      person: [],
      username: [],
      check: [],
      XL: null,
      XR: null,
      answer: null
    }
  }
  

  componentDidMount() {
    axios.get(`http://localhost:5000/Data/Bitsection`)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ 
          person:data.id,
          username:data.Question,
          XL:data.XL,
          XR:data.XR,
        });
      })
  }
  bisec(){
    var func = this.func 
    var XL = this.state.XL
    var XR = this.state.XR
    var M ;
    let A = 0;
    M =(XL+XR)/2
    var err = [];
    while (Math.abs(M-A)/M>0.000001){
        var err1 = Math.abs(M-A)/M;
        err.push(err1)
        if(func(M)*func(XR)>0){
            A = XR;
            XR = M;
        }
        else{
            A = XL;
            XL = M;
           
            
        }
        M = (XL+XR)/2
    }
    console.log(M)
    this.setState({answer:M})
    this.setState({check:err})
  }
  func(xx){
    let x=this.state.username
    console.log(x)
    let r = math.evaluate(x, { x: xx })
    //console.log(r)
    return r
  }

  render() {
    return (
      <div>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {this.setState({ XL: e.target.value })
          this.forceUpdate()}}
          value={this.state.XL}
          placeholder="XL"
        />
        <ul></ul>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {this.setState({ XR: e.target.value })
          this.forceUpdate()}}
          value={this.state.XR}
          placeholder="XR"
        />
        <ul></ul>
        <TextField label="Filled success" variant="filled" color="success" focused value={this.state.username} />
        <ul></ul>
        <Button type="primary" onClick={this.bisec}>Answer</Button>
        <ul></ul>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.answer}
        />
        <ul></ul>
        <Button type="ghost" onClick={() => {
        console.info("Ans: ",this.state.iterlatoin,"Error: ",this.state.check)
        }}>Check</Button>
        <ul></ul>
        <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
      </div>
    )
  }
}