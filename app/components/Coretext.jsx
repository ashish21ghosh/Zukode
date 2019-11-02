import React, { Component } from "react";
import { Input } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
const { TextArea } = Input;

import Content from "./Content/Content";
import ContentEditable from "./ContentEditable/ContentEditable"; 
const ENTER_KEY = 13;

export default class Coretext extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            sentData: {},
            pageData: {},
            head: this.props.currentHead,
            coretextParent: {},
            csrftoken: Cookies.get('csrftoken'),
        };

        // this.editPageData = this.editPageData.bind(this);
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


    editPageData(new_elem) {
        let page_data = this.state.pageData;
        const elem_id = new_elem.id;
        const parent_id = new_elem.parent;
        page_data["data"][parent_id].child = elem_id;
        page_data["data"][elem_id] = new_elem;
        this.setState({
            pageData: page_data
        });
        // console.log('new_elem',new_elem);
        // console.log('this.state.pageData["data"]',this.state.pageData["data"]);
    }


    componentDidMount(){
        axios.get('http://localhost:8000/api/coretext').then((response)=>{
            console.log(response.data);
            this.setState(()=>{
                return {
                    pageData: response.data
                }
            })
        });
    }


    render() {
      const pageData = this.state.pageData["data"];
      let content = [];
      let coretext_parent = {};
      console.log('Heads>>',  this.props.heads);
      let last_child = this.props.heads.map((head) => {
        content.push(head);
        const child = head.child;
        if (pageData && pageData[child]) {
          let nextChild = pageData[child];
          while (nextChild) {      
            content.push(nextChild);
            if (nextChild.child) {
              nextChild = pageData[nextChild.child];
            } else {
              return nextChild;
            }
          } 
        }
      });

      if (last_child.length > 0) {
        coretext_parent = last_child[last_child.length - 1];
        console.log('Last Child', last_child[last_child.length - 1]);
      }

        return (
            <div>
              <Content 
                // addedValue={this.state.sentData}
                content={content}
                // removeEntry={this.removeEntry}
                // heads={this.props.heads}
              />
              {/* <TextArea  
                autosize={{ minRows: 2 }} 
                id='coretext' 
                wrap='soft'
                value={this.state.inputValue} 
                onChange={evt => this.updateInputValue(evt)}
              /> */}
              <ContentEditable 
                parent={coretext_parent}
                editPageData={this.editPageData.bind(this)}
              />
            </div>
            
        )
    }
}

