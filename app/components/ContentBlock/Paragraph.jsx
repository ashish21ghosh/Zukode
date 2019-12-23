import React from "react";
import ContentEditable from "../ContentEditable/ContentEditable"
import './style.css';


export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      content: this.props.items.content,
      addEditor: false,
    };
    // this.updateContent.bind(this);
  }

  handleClick = () => {
    this.setState({
        edit: true,
    });
  }

  updateContent = (content, newEditor=false) => {
      this.setState({
        edit: false,
        content: content,
        addEditor: newEditor,
    });
  }

  render() {
    if (!this.state.edit) {
      const nextEditable = (this.state.addEditor) ?  <ContentEditable 
                              headId={this.props.items.head}
                              parentId={this.props.items.id}
                              editPageData={this.props.editPageData}
                            /> : null;

      return (
        <div>
          <p onMouseDown={this.handleClick}>
            {this.state.content}
          </p>
          {nextEditable}
        </div>
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
