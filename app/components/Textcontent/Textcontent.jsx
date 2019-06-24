import React from "react";
import axios from "axios";
import Paragraph from "../Paragraph/Paragraph"
import ParentTitle from "../ParentTitle/ParentTitle"
import {Icon, Row, Col} from 'antd';
import './style.css';
import Cookies from 'js-cookie';

export default class Textcontent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      csrftoken: Cookies.get('csrftoken'),
    };
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
          items: this.state.items.filter(el => el.id !== pk)
        })
    });
  }

  render() {
    const content = this.props.pageData.map((item, idx) => (
      <Row key={'elem' + item.id + idx}>
        <Col span={20} className='red_light'>
        {(() => {
          switch (item.content_type) {
            case "head": return <ParentTitle items={item.content}/>;
            case "text": return <Paragraph items={item.content}/>;
            default:     return <Paragraph items={item.content}/>;
          }
        })()}
          
        </Col>
        <Col span={2}>
          <Icon type="edit" theme="twoTone" className='icon-generic'/>
          <Icon type="close-circle" className='icon-generic'
            theme="twoTone" twoToneColor="#ff0000" 
            onClick={evt => this.props.removeEntry(evt, item.id)} />
        </Col>
      </Row>
      
    ));

    return (
      <div>
      {content}
      </div>
      
    )
  }
}