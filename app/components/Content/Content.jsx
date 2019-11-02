import React from "react";
import axios from "axios";
import Paragraph from "../ContentBlock/Paragraph"
import Mathgraph from "../ContentBlock/Mathgraph"
import ParentTitle from "../ContentBlock/ParentTitle"
import {Icon, Row, Col} from 'antd';
import './style.css';
import Cookies from 'js-cookie';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
   /* props = {
    *  pageData: {},
    *  heads: []
    * }
    */

    this.state = {
      // error: null,
      // isLoaded: false,
      // content: [],
      // csrftoken: Cookies.get('csrftoken'),
    };
  }

  // removeEntry = (evt, pk) => {
  //   let url = 'http://localhost:8000/api/delete_entry/' + pk;

  //   axios({
  //       method: 'delete',
  //       url: url,
  //       headers: {
  //           "X-CSRFToken": this.state.csrftoken,
  //         }
  //   }).then((response)=>{
  //       this.setState({
  //         items: this.state.items.filter(el => el.id !== pk)
  //       })
  //   });
  // }

  componentDidMount(){  
    // const pageData = this.props.pageData["data"];
    // let content = [];
    // console.log('Heads>>',  this.props.heads)
    // let last_child = this.props.heads.map((head, idx) => {
    //   content.push((() => {
    //     return <ParentTitle items={head.content} key={'head_'+idx}/>;
    //   })());

    //   const child = head.child;
    //   if (pageData && pageData[child]) {
    //     let nextChild = pageData[child];
    //     while (nextChild) {      
    //       content.push(
    //         (() => {
    //           switch (nextChild.content_type) {
    //             case "head": return <ParentTitle key={'head_'+nextChild.id} items={nextChild}/>;
    //             case "text": return <Paragraph key={'para_'+nextChild.id} items={nextChild}/>;
    //             case "math": return <Mathgraph key={'math_'+nextChild.id} items={nextChild}/>;
    //             default:     return <Paragraph key={'para_'+nextChild.id} items={nextChild}/>;
    //           };
    //         })()
    //       );
    //       if (nextChild.child) {
    //         nextChild = pageData[nextChild.child];
    //       } else {
    //         return nextChild;
    //       }
    //     } 
    //   }
    // });

    // if (last_child.length > 0) {
    //   this.setLastChild(last_child[last_child.length - 1]);
    //   // console.log('Last Child', last_child[last_child.length - 1]);
    // }
    // console.log(content);
    // this.setState({
    //   content: content
    // });
  }

  // setLastChild = (data) => {
  //   this.props.editHeadProp(data);
  // }

  render() {
    let content = this.props.content.map((data, idx) => {
      switch(data.content_type) {
        case "head": return <ParentTitle key={'head_'+data.id} items={data}/>;
        case "text": return <Paragraph key={'para_'+data.id} items={data}/>;
        case "math": return <Mathgraph key={'math_'+data.id} items={data}/>;
        default:     return <Paragraph key={'para_'+data.id} items={data}/>;
      };
    });

    return (
      <div>
      {content}
      </div>
      
    )
  }
}