import React from "react";
import Highlight from 'react-highlight';
import ContentEditable from "../ContentEditable/ContentEditable"

import BarChart from "../Charts/BarChart"

export default class CodeBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    this.setState({
        edit: false,
        content: content
    });
    }

    render() {
        if (!this.state.edit) {
          return (
            <div onMouseDown={this.handleClick}>
              <Highlight>
              {this.state.content}
              </Highlight>
            </div>
          )
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