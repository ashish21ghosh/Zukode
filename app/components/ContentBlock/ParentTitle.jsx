import React from "react";
import ContentEditable from "../ContentEditable/ContentEditable"
import './style.css';

export default class ParentTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            content: this.props.items.content,
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
            return (
              <div onMouseDown={this.handleClick}>
                <h1>{this.state.content}</h1>
              </div>
            );
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