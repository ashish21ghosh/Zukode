import React, { Component } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import Cookies from 'js-cookie';
import _uniqueId from 'lodash/uniqueId';
import './style.css';

const ENTER_KEY = 13;

export default class ContentEditable extends Component {
  constructor(props){
    super(props);
    this.id = _uniqueId("text_input_");
    // console.log(this.id);
    
    this.state = {
      csrftoken: Cookies.get('csrftoken'),
      inputValue: this.props.inputValue,
      contentId: this.props.contentId,
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
        this.props.editPageData(response.data);
        this.setState({
          inputValue: ''
        });
      })
      .catch((error) => {
        console.log('ERROR!!!', error);
      });
  }

  putContent = (id, payload) => {
    axios.put(
      `http://localhost:8000/api/coretext/${id}`,
      payload,
      {headers: {
          "X-CSRFToken": this.state.csrftoken
      }}
    ).then((response) => {
      // console.log('response>>', response.data);
      this.props.updateContent(response.data.content);
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
      // console.log('payload>>>>', payload);
      // console.log('data>>>>', data);
      this.props.editPageData(data);
      this.setState({
        inputValue: ''
      });
    }).catch((error) => {
      console.log('ERROR!!!', error);
    });
  }
  
  putHead = (id, payload) => {
    axios.put(
      `http://localhost:8000/api/corehead/${id}`,
      payload,
      {headers: {
        "X-CSRFToken": this.state.csrftoken
      }}
    ).then((response) => {
      // console.log('response>>', response.data);
      this.props.updateContent(response.data.content);
    })
    .catch((error) => {
      console.log('ERROR!!!', error);
    });
  }

  escFunction = event => {
    if(event.keyCode === ENTER_KEY && event.shiftKey) {
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
          content = content.substring(first_space).trim();
        }
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
        console.log('current_data>> ', current_data);
        this.putContent(this.state.contentId, current_data);
      } else if (content_type != 'head') {
        current_data.head = head_id;
        console.log('current_data>> ', current_data);
        this.postContent(current_data);
      } else if (content_type == 'head' && this.state.contentId) {
          // console.log('this.state.contentId', this.state.contentId);
        console.log('current_data', current_data);
        this.putHead(this.state.contentId, current_data);
      } else {
        if (level != 0) {
          current_data.parent = head.id;
        } else {
          delete current_data.parent;
        }
        current_data.level = level;
        console.log('current_data', current_data);
        this.postHead(current_data);
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
            <TextareaAutosize  
              id={this.id}
              className='txtarea'
              value={this.state.inputValue} 
              onChange={evt => this.updateInputValue(evt)}
            />
            </div>
        )
    }
}

