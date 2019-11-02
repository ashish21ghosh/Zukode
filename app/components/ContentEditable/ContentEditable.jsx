import React, { Component } from "react";
import { Input } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
import _uniqueId from 'lodash/uniqueId';
const { TextArea } = Input;

const ENTER_KEY = 13;

export default class ContentEditable extends Component {
    constructor(props){
        super(props);
        this.id = _uniqueId("text_input_");
        console.log(this.id);
        
        this.state = {
            csrftoken: Cookies.get('csrftoken'),
            inputValue: this.props.inputValue,
            contentId: this.props.contentId,
        };
    }

    escFunction = event => {
        // if (!this.props.parent || !this.props.parentId) {
        //     return;
        // }
        if(event.keyCode === ENTER_KEY && event.shiftKey) {
            let content = this.state.inputValue;
            let content_type = 'text';
            let head = this.props.head;
            let parent_id;
            if (this.props.contentType) {
                content_type = this.props.contentType;
            }
            let first_char = content.substring(0,1);
            let first_space = content.indexOf(" ");
            let first_word = content.substring(0,first_space);

            if (first_char == '#') {
                content = content.substring(1).trim();
                this.props.nav(content);
                head = content;
                content_type = 'head';
            } else if (first_char == '$') {
                if (first_word == '$math') {
                    content_type = 'math';
                    content = content.substring(first_space).trim();
                }
            }
            if (this.props.parentId) {
                parent_id = this.props.parentId;
            } else if (this.props.parent && this.props.parent.id) {
                parent_id = this.props.parent.id;
                head = this.props.parent.head;
            }
            
            const current_data = {
                head: head,
                content: content,
                content_type: content_type,
                parent: parent_id
            }
            console.log('current_data>> ', current_data);
            console.log('contentId>> ', this.state.contentId);

            if (this.state.contentId) {
                axios.put(
                    `http://localhost:8000/api/coretext/${this.state.contentId}`,
                    current_data,
                    {
                      headers: {"X-CSRFToken": this.state.csrftoken}
                    }
                  )
                  .then((response) => {
                      console.log('response>>put>>', response.data);
                      this.props.updateContent(content);
                    //   this.props.editPageData(response.data);
                    //   this.setState({
                    //     inputValue: ''
                    //   })

                  })
                  .catch((error) => {
                    console.log('ERROR!!!', error);
                  });
            } else {
              axios.post(
                'http://localhost:8000/api/coretext', 
                current_data,
                {
                  headers: {"X-CSRFToken": this.state.csrftoken}
                }
              )
              .then((response) => {
                  console.log('response', response.data);
                  this.props.editPageData(response.data);
                  this.setState({
                    inputValue: ''
                  })
                // let pageData = this.state.pageData;
                // pageData.push(response.data);
                // this.setState({
                //     inputValue: '',
                //     sentData: response.data,
                //     head: head,
                //     pageData: pageData
                // });
              })
              .catch((error) => {
                console.log('ERROR!!!', error);
              });
            }
        }
    }

    updateInputValue = evt => {
        this.setState({
          inputValue: evt.target.value
        });
      }

    componentDidMount(){
        document.getElementById(this.id).addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.getElementById(this.id).removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        return (
          <div>
            <TextArea  
              autosize={{ minRows: 2 }} 
              id={this.id}
              wrap='soft'
              value={this.state.inputValue} 
              onChange={evt => this.updateInputValue(evt)}
            />
            </div>
        )
    }
}

