import React from "react";
import ContentBlock from "../ContentBlock/ContentBlock"
import './style.css';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.content.map((data) => {
      return (<ContentBlock 
        key={`${data.content_type}_${data.id}`} 
        items={data}
        editPageData={this.props.editPageData}
      />);
    });

    return (
      <div>
      {content}
      </div>
    )
  }
}