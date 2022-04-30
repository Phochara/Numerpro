import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { rightArithShift } from 'mathjs';
import { LineChart, Line } from 'recharts';
const math = require('mathjs')

export default class PersonList extends React.Component {
    constructor(props){
      super(props)
      this.false=this.false.bind(this)
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
        axios.get(`http://localhost:5000/Data/Falseposition`)
          .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({ 
              person:data.id,
              username:data.fx,
              XL:data.XL,
              XR:data.XR,
            });
        })
    }
    false(){
        var func = this.func
        var XL = this.state.XL
        var XR = this.state.XR
        var max = 1000000;
        var R;
        var L;
        var fx;
        fx = (XL+XR)/2
        if (fx(XL) * fx(XR) >= 0){
            return;
        }
        XL = L;
    
        for (var i=0; i < max; i++)
        {
            var X1N = ((L*fx(R) - R*fx(L))/ (fx(R) - fx(L)));
            if (fx(X1N)==0){
                break;
            }
            
            else if (fx(X1N)*fx(R) > 0){
                L = X1N;
            }
            else{
                R = X1N;
            }
        }
        console.log(X1N)
        this.setState({answer:X1N})
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
            
          </div>
        )
      }
}