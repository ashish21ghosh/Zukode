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
        };
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
      if (this.props.items.level == 0) {
        return (
          <div onMouseDown={this.handleClick}>
            <h2>{this.props.items.content}</h2>
          </div>
        );
      } else {
        return (
          <div onMouseDown={this.handleClick}>
            <h3>{this.props.items.content}</h3>
          </div>
        );
      }
      
    } else {
      return (
        <div>
          <ContentEditable 
            id={'block_' + this.props.items.id}
            head={this.props.items.head}
            inputValue={this.props.items.content}
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