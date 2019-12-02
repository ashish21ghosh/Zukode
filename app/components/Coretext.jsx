import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

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
    let elem_content_type = new_elem.content_type;
    let elem_parent = new_elem.parent;
    let elem_id = new_elem.id;

    let page_data = this.state.pageData;

    if (elem_content_type != 'head') {
      let elem_head = new_elem.head;
      page_data["data"][elem_head]["data"][elem_id] = new_elem;
      page_data["data"][elem_head]["data"][elem_parent].child = elem_id;
    } else {
      page_data["head"][elem_id] = new_elem;
      if (elem_parent) {
        page_data["head"][elem_parent]['child'] = elem_id;
      }
      this.props.nav(new_elem);
      console.log('NEW_ELEM>>', new_elem);
      console.log('DATA>>', page_data);
    }
    this.setState({
        pageData: page_data
    });
  }


    componentDidMount(){
        axios.get('http://localhost:8000/api/coretext').then((response)=>{
            this.setState(()=>{
                return {
                    pageData: response.data
                }
            })
        });
    }


    render() {
      const pageData = this.state.pageData["data"];
      const headData = this.state.pageData["head"];
      let base_head = [];
      if (headData) {
        Object.entries(headData).forEach(
            ([key, val]) => {
              if (val['level'] == 0){
                base_head.push(val);
              }
            }
        )
      }

      let content = [];
      let coretext_parent = {};
      let corehead_parent = {};
      base_head.map((head) => {
        while (head) {
          head['content_type'] = 'head'
          content.push(head);
          corehead_parent = head;
          coretext_parent = {};
          const head_id = head.id;
          
          if (pageData[head_id]) {
            const data_head_id = pageData[head_id]["head"];
            const data_dict = pageData[head_id]["data"];
            if (data_dict && data_dict[data_head_id]) {
              let nextChild = data_dict[data_head_id];
              while (nextChild) {      
                content.push(nextChild);
                coretext_parent = nextChild;
                nextChild = data_dict[nextChild.child];
              } 
            }
          }
          let head_child = head.child;
          head = headData[head_child];
        }
      });

        return (
            <div>
              <Content 
                content={content}
              />
              <ContentEditable 
                parent={coretext_parent}
                head={corehead_parent}
                editPageData={this.editPageData.bind(this)}
                pageLevel={this.props.pageLevel}
              />
            </div>
            
        )
    }
}

