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
            pageData: [],
            head: 'default',
            csrftoken: Cookies.get('csrftoken'),
        };
    }

    escFunction = event => {
        if(event.keyCode === ENTER_KEY && event.shiftKey) {
            let content = this.state.inputValue;
            let content_type = 'text';
            let head = this.state.head;
            let first_char = content.substring(0,1);

            if (first_char == '#') {
                content = content.substring(1).trim();
                this.props.nav(content);
                head = content;
                content_type = 'head';
            }

            const current_data = {
                head: head,
                content: content,
                content_type: content_type,
            }
            
            axios.post(
                'http://localhost:8000/api/coretext', 
                current_data,
                {
                  headers: {"X-CSRFToken": this.state.csrftoken}
                }
              )
              .then((response) => {
                console.log(response);
                let pageData = this.state.pageData;
                pageData.push(response.data);
                this.setState({
                    inputValue: '',
                    sentData: response.data,
                    head: head,
                    pageData: pageData
                });
              })
              .catch((error) => {
                console.log('ERROR!!!', error);
              });
        }
    }

    removeEntry = (evt, pk) => {
        let url = 'http://localhost:8000/api/delete_entry/' + pk;
    
        axios({
            method: 'delete',
            url: url,
            headers: {
                "X-CSRFToken": this.state.csrftoken,
                }
        }).then((response)=>{
            this.setState({
                pageData: this.state.pageData.filter(el => el.id !== pk)
            })
        });
    }

    updateInputValue = evt => {
        this.setState({
          inputValue: evt.target.value
        });
      }

    componentDidMount(){
        document.getElementById('coretext').addEventListener("keydown", this.escFunction, false);
        axios.get('http://localhost:8000/api/coretext').then((response)=>{
            this.setState(()=>{
                return {
                    pageData: response.data
                }
            })
        });
    }

    componentWillUnmount(){
        document.getElementById('coretext').removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        return (
            <div>
                <Textcontent 
                addedValue={this.state.sentData}
                pageData={this.state.pageData}
                removeEntry={this.removeEntry}
                 />
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

