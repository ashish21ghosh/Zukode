import React from "react";
import axios from "axios";
import Paragraph from "./Paragraph/Paragraph"

export default class Textcontent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
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

  render() {
    const content = this.state.items.map((item, idx) => (
      <Paragraph key={idx} items={item.content} />
    ));

    return (
      <div>
      <h1>Content Here</h1>
      {content}
      </div>
      
    )
  }
}