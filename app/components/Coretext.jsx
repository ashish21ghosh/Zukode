import React, { Component } from "react";
import { Input } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
const { TextArea } = Input;

import Textcontent from "./Textcontent/Textcontent"
const ENTER_KEY = 13;

export default class Coretext extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            sentData: {},
            csrftoken: Cookies.get('csrftoken'),
        };
    }

    escFunction = event => {
        if(event.keyCode === ENTER_KEY && event.shiftKey) {
            const current_data = {
                head: 'test',
                content: this.state.inputValue,
                content_type: 'text',
            }
            
            axios.post(
                'http://localhost:8000/api/coretext', 
                current_data,
                {
                  headers: {"X-CSRFToken": this.state.csrftoken}
                }
              )
              .then((response) => {
                console.log(response)
                this.setState({
                    inputValue: '',
                    sentData: response.data,
                });
              })
              .catch((error) => {
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
            <div>
                <Textcontent addedValue={this.state.sentData} />
                <TextArea 
                    placeholder="Start Typing..." 
                    autosize={{ minRows: 2 }} 
                    id='coretext' 
                    value={this.state.inputValue} 
                    onChange={evt => this.updateInputValue(evt)}
                />
            </div>
            
        )
    }
}

