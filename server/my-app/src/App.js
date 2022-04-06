import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  constructor(props){
    super(props)
    this.bisec=this.bisec.bind(this)
    this.state = {
      person: [],
      username: [],
      XL: null,
      XR: null
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
    var XL = this.state.XL
    console.log(XL)
  }

  render() {
    return (
      <div>
        

      </div>
    )
  }
}