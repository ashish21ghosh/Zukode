import React from "react";
import ContentEditable from "../ContentEditable/ContentEditable"
import './style.css';


export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      error: null,
      content: this.props.items.content,
      isLoaded: false,
    };
    this.updateContent.bind(this)
  }

  handleClick = () => {
    this.setState({
        edit: true
    });
  }

  updateContent = (content) => {
      this.setState({
        edit: false,
        content: content
    });
  }

  render() {
    if (!this.state.edit) {
        // console.log('this.props.items',this.props.items);
      return (
        <p onMouseDown={this.handleClick}>
          {this.state.content}
      </p>
      );
    } else {
      return (
      <div>
        <ContentEditable 
          id={'block_' + this.props.items.id}
          headId={this.props.items.head}
          inputValue={this.state.content}
          contentId={this.props.items.id}
          parentId={this.props.items.parent}
          childId={this.props.items.child}
          contentType={this.props.items.content_type}
          updateContent={this.updateContent}
        />
      </div>
      );
    }
  }
}
