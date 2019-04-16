import React, { Component } from "react";
import { Input } from 'antd';
import axios from "axios";
const { TextArea } = Input;
const ENTER_KEY = 13;

export default class Coretext extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: ''
        };
        // this.escFunction = this.escFunction.bind(this);
    }

    escFunction = event => {
        if(event.keyCode === ENTER_KEY && event.shiftKey) {
            
            axios.post('http://localhost:8000/api/coretext', {
                head: 'test',
                content: this.state.inputValue,
                content_type: 'text',
              })
              .then(function (response) {
                this.state.inputValue = '';
              })
              .catch(function (error) {
                console.log('ERROR!!!', error);
              });
        }
    }

    updateInputValue = evt => {
        this.setState({
          inputValue: evt.target.value
        });
      }

    componentDidMount(){
        document.getElementById('coretext').addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.getElementById('coretext').removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        return (
            <TextArea 
                placeholder="Start Typing..." 
                autosize={{ minRows: 2 }} 
                id='coretext' 
                value={this.state.inputValue} 
                onChange={evt => this.updateInputValue(evt)}
            />
        )
    }
}

