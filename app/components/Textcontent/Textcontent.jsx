import React from "react";
import axios from "axios";
import Paragraph from "../Paragraph/Paragraph"
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

  componentDidMount() {
    axios.get('http://localhost:8000/api/coretext').then((response)=>{
      this.setState(()=>{
        return {
          items: response.data
        }
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.addedValue !== prevProps.addedValue) {
      let items_prop = this.state.items;
      items_prop.push(this.props.addedValue);
      this.setState(()=>{
        return {
          items: items_prop
        }
      })
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
          items: this.state.items.filter(el => el.id !== pk)
        })
    });
  }

  render() {
    const content = this.state.items.map((item, idx) => (
      <Row key={'elem' + item.id + idx}>
        <Col span={20} className='red_light'>
          <Paragraph items={item.content}/>
        </Col>
        <Col span={2}>
          <Icon type="edit" theme="twoTone" className='icon-generic'/>
          <Icon type="close-circle" className='icon-generic'
            theme="twoTone" twoToneColor="#ff0000" 
            onClick={evt => this.removeEntry(evt, item.id)} />
        </Col>
      </Row>
      
    ));

    return (
      <div>
      <h1>Content Here</h1>
      {content}
      </div>
      
    )
  }
}