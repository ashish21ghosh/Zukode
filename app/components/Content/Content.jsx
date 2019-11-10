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
  }

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