import React from "react";
import ContentEditable from "../ContentEditable/ContentEditable"
import './style.css';

export default class ParentTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            edit: false,
            content: this.props.items.content,
        };
    }

    handleClick = () => {
      this.setState({
        edit: true
      });
    }
    
    updateContent = (content) => {
      console.log('content>>', content);
      this.setState({
        edit: false,
        content: content
      });
    }

  render() {

    if (!this.state.edit) {
      if (this.props.items.level == 0) {
        return (
          <div onMouseDown={this.handleClick} id={this.props.items.content.replace(/\s+/g, '-').toLowerCase()}>
            <h2>{this.state.content}</h2>
          </div>
        );
      } else {
        return (
          <div onMouseDown={this.handleClick} id={this.props.items.content.replace(/\s+/g, '-').toLowerCase()}>
            <h3>{this.state.content}</h3>
          </div>
        );
      }
      
    } else {
      return (
        <div>
          <ContentEditable 
            id={'block_' + this.props.items.id}
            head={this.props.items.head}
            inputValue={this.state.content}
            contentId={this.props.items.id}
            parentId={this.props.items.parent}
            child={this.props.items.child}
            contentType={this.props.items.content_type}
            updateContent={this.updateContent.bind(this)}
          />
        </div>
      );
    }
  }
}