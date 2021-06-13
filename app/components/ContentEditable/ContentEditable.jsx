import React, { Component } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import Cookies from 'js-cookie';
import _uniqueId from 'lodash/uniqueId';
import './style.css';
const helper =  require('./helper');

// import Editor from 'react-simple-code-editor';

// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-markup';

// require('prismjs/components/prism-jsx');

const ENTER_KEY = 13;
const TAB_KEY = 9;

export default class ContentEditable extends Component {
  constructor(props){
    super(props);
    this.id = _uniqueId("text_input_");
    // console.log(this.id);
    
    this.state = {
      csrftoken: Cookies.get('csrftoken'),
      inputValue: this.props.inputValue,
      contentId: this.props.contentId,
      code: '',
    };
  }

  postContent = (payload) => {
    axios.post(
      'http://localhost:8000/api/coretext', 
      payload,
      {
        headers: {"X-CSRFToken": this.state.csrftoken}
      }
      )
      .then((response) => {
        console.log('post_data_Response>>', response.data);
        this.props.editPageData(response.data);
        this.setState({
          inputValue: ''
        });
        if (this.props.setAddEditor) {
          this.props.setAddEditor(false);
        }
      })
      .catch((error) => {
        console.log('ERROR!!!', error);
      });
  }

  putContent = (id, payload, newEditor=false) => {
    axios.put(
      `http://localhost:8000/api/coretext/${id}`,
      payload,
      {headers: {
          "X-CSRFToken": this.state.csrftoken
      }}
    ).then((response) => {
      console.log('put_data_Response>>', response.data);
      this.props.updateContent(response.data, newEditor);
    })
    .catch((error) => {
      console.log('ERROR!!!', error);
    });
  }

  postHead = (payload) => {
    axios.post(
      'http://localhost:8000/api/corehead', 
      payload,
      {headers: {
        "X-CSRFToken": this.state.csrftoken
      }}
    ).then((response) => {
      let data = response.data;
      data.content_type = payload.content_type;
      console.log('post_head_response>>>>', data);
      this.props.editPageData(data);
      this.setState({
        inputValue: ''
      });
    }).catch((error) => {
      console.log('ERROR!!!', error);
    });
  }
  
  putHead = (id, payload, newEditor=false) => {
    axios.put(
      `http://localhost:8000/api/corehead/${id}`,
      payload,
      {headers: {
        "X-CSRFToken": this.state.csrftoken
      }}
    ).then((response) => {
      console.log('put_head_response>>', response.data);
      response.data["content_type"] = 'head';
      this.props.updateContent(response.data, newEditor);
    })
    .catch((error) => {
      console.log('ERROR!!!', error);
    });
  }

  escFunction = event => {
    helper.handleKeyDown(event);
    // console.log(event.srcElement.selectionStart);
    // console.log(event.srcElement.selectionEnd);
    if(event.keyCode === ENTER_KEY && (event.shiftKey || event.metaKey)) {
      let content = this.state.inputValue;
      let content_type = 'text';
      let head = this.props.head;
      let parent = this.props.parent;
      let parent_id;
      let head_id;
      let level;
      if (this.props.contentType) {
        content_type = this.props.contentType;
      }
      let first_char = content.substring(0,1);
      let first_space = content.indexOf(" ");
      let first_word = content.substring(0,first_space);

      if (first_char == '#') {
        let hash_count = content.match('^#+')[0].length - 1;
        if(hash_count + this.props.pageLevel - head.level > 1) {
          level = this.props.pageLevel + head.level + 1
        } else {
          level = this.props.pageLevel + hash_count;
        }

        content = content.substring(hash_count + 1).trim();
        content_type = 'head';
      } else if (first_char == '$') {
        if (first_word == '$math') {
          content_type = 'math';
        } else if (first_word == '$code') {
          content_type = 'code';
        } else if (first_word == '$md') {
          content_type = 'md';
        } else if (first_word == '$link') {
          content_type = 'link';
        }
        content = content.substring(first_space).trim();
      }
      if (this.props.parentId) {
        parent_id = this.props.parentId;
      } else if (parent && parent.id) {
        parent_id = parent.id;
      }

      if (this.props.headId) {
        head_id = this.props.headId;
      } else if (head && head.id) {
        head_id = head.id;
      }

      const current_data = {
        content: content,
        parent: parent_id,
        content_type: content_type,
      }

      if (content_type != 'head' && this.state.contentId) {
        current_data.head = head_id;
        console.log('put_data>> ', current_data);
        this.putContent(this.state.contentId, current_data, event.metaKey);
      } else if (content_type != 'head') {
        current_data.head = head_id;
        console.log('post_data>> ', current_data);
        this.postContent(current_data);
      } else if (content_type == 'head' && this.state.contentId) {
          // console.log('this.state.contentId', this.state.contentId);
        console.log('put_head', current_data);
        this.putHead(this.state.contentId, current_data, event.metaKey);
      } else {
        if (level != 0) {
          current_data.parent = head.id;
        } else {
          delete current_data.parent;
        }
        current_data.level = level;
        console.log('post_head', current_data);
        this.postHead(current_data);
      }
    } else if(event.keyCode === TAB_KEY) {
      event.preventDefault();
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
        if (this.props.writable) {
          return (
            // <div className="container_editor_area">
            <div>
              <TextareaAutosize  
                id={this.id}
                className='txtarea'
                value={this.state.inputValue} 
                onChange={evt => this.updateInputValue(evt)}
              />
              {/* <Editor
                id={this.id}
                onChange={evt => this.updateInputValue(evt)}
                placeholder="Type some code…"
                value={this.state.code}
                onValueChange={code => this.setState({ code })}
                highlight={code => highlight(code, languages.jsx)}
                padding={10}
                className="container__editor"
              /> */}
            </div>
          );
        } else {return (
          null
        )}
    }
}

