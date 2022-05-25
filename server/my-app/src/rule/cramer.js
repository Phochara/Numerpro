import React, {Component} from 'react'
import axios from 'axios';
import { Card } from 'antd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const math = require('mathjs');
var dataset = [];
var A = [], B = [], answer = [], matrixA = [], matrixB = []
export default class Test extends Component {
    constructor(props){
        super(props)
        this.buildmatrix = this.buildmatrix.bind(this)
        this.creat = this.creat.bind(this)
        this.Matrix = this.Matrix.bind(this)
        this.state = {
            Text:'',
            A:null,
            B:null,
            matrixa:[],
            matrixb:[],
            col:null,
            row:null,
            answer:null,
            showMatrixFrom:false
        }
    };
    componentDidMount(){
        axios.get('http://localhost:5000/api/cramer').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                A:data.A,
                col:data.col,
                row:data.row
            })
            this.buildmatrix()
            for (var i = 0; i < this.state.row; i++) {
                for (var j = 0; j < this.state.col; j++) {
                    document.getElementById('a' + (i + 1) + '' + (j + 1)).value =
                        data.A[i][j]
                    document.getElementById('b' + (i + 1)).value =
                        data.B[i][0]
                }
            }
        })
    };
    buildmatrix(){
        let row = this.state.row
        let col = this.state.col
        matrixA = []
        matrixB = []
        for(var i = 1 ; i <= row ; i++){
            for(var j = 1 ; j <= col ; j++){
                matrixA.push(
                    <TextField
                        type="Matrix"
                        label={"a" + i + "" + j}
                        id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j}
                    />
                )
            }
            matrixA.push(<Box/>)
            matrixB.push(<TextField
                type="number"
                label={"b" + i + "" + j}
                id={"b" + i} key={"b" + i} placeholder={"b" + i}/>)
                matrixB.push(<Box/>)
        }
        this.setState({showMatrixFrom:true})
    }
    Matrix(){
        for(var i = 0; i < this.state.row;i++){
            A[i] = []
            for (var j = 0 ; j < this.state.col; j++){
                A[i][j] = parseFloat(
                    document.getElementById('a' + (i+1) + '' + (j+1) ).value
                )
            }
            B[i] = []
            B[i].push(parseFloat(document.getElementById('b' + (i+1)).value))
        }
        console.log('Matrix')
    }
    cal(){
        var data = []
        data['x'] = []
        console.log(A)
        console.log(B)
        var a = math.matrix(A)
        var b = math.matrix(B)
        for (let i = 0; i < a.size()[0]; i++) {
            data['x'].push(
                math.round(
                    math.det(
                        math.subset(
                            a,
                            math.index(math.range(0, a.size()[0]), i),
                            math.subset(
                                b,
                                math.index(math.range(0, a.size()[0]), 0)
                            )
                        )
                    )
                ) / math.round(math.det(a))
            )
        }
    }
    creat(){
        this.Matrix()
        this.cal()
        console.log('submit')
    }
    render(){
        return(
            <div>
                <div>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="ROW"
                            type="Matrix"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={async (e) => {
                                await this.setState({
                                    row: e.target.value,
                                })
                            }}
                            value={this.state.row}
                            name="Row"
                            placeholder="Row"
                        />
                        <TextField
                            id="outlined-number"
                            label="COLUMN"
                            type="Matrix"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={async (e) => {
                                await this.setState({
                                    col: e.target.value,
                                })
                            }}
                            value={this.state.col}
                            name="Column"
                            placeholder="Dimension"
                        />
                        <Button
                             variant="contained" onClick={this.buildmatrix}>Submit
                        </Button>        
                    </div>
                    <br/>
                    <Button variant="inherit"  onClick={() => {console.info({dataset}," col: ",this.state.col," row:  ",this.state.row,this.state.matrixA)}}>console.log</Button>
                    <br/>
                    <Card className="col">
                        {
                            this.state.showMatrixFrom &&
                            <div>
                                <h2>Matrix [A]</h2> <br/>{matrixA}<br/>
                                <h2>Vector [B]</h2> <br/>{matrixB}<br/>
                            </div>

                        }
                        
                </Card>
                <br/>
                <Button
                    variant="contained" onClick={this.creat}>Submit
                </Button>
                </div>
            </div>
        )
    }
}