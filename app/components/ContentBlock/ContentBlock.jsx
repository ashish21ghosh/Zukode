import React, { useState, useEffect } from 'react';
import ContentEditable from "../ContentEditable/ContentEditable"
import { InlineMath, BlockMath } from 'react-katex';
import Highlight from 'react-highlight';
import './style.css';

import ReactMarkdown from 'react-markdown';

function Block(props) {
  switch(props.item.content_type) {
    case "head": return (
      <div onMouseDown={props.handleClick} id={props.item.content.replace(/\s+/g, '-').toLowerCase()}>
        <h2>{props.item.content}</h2>
      </div>);
    case "text": return (
      <p onMouseDown={props.handleClick}>
        {props.item.content}
      </p>);
    case "math": return (
      <div onMouseDown={props.handleClick}>
        <BlockMath math={props.item.content} />
      </div>
    );
    case "code": return (
      <div onMouseDown={props.handleClick}>
        <Highlight>
        {props.item.content}
        </Highlight>
      </div>
    );
    case "md": return (
      <div onMouseDown={props.handleClick}>
        <ReactMarkdown source={props.item.content} />
      </div>
    );
    default: return (
        <p onMouseDown={props.handleClick}>
          {props.item.content}
        </p>);;
  };
}


export default function ContentBlock(props) {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(props.items);
  const [addEditor, setAddEditor] = useState(false);

  const handleClick = () => {
    setEdit(true);
  }

  const updateContent = (content, newEditor=false) => {
    console.log('updateContent>>', content);
    setAddEditor(newEditor);
    setItem(content);
    setEdit(false);
  }

    if (!edit) {
      const parentId = (item.content_type === 'head') ? null : item.id;
      const headId = (item.content_type === 'head') ? item.id : item.head;
      const nextEditable = (addEditor) ?  <ContentEditable 
                              headId={headId}
                              parentId={parentId}
                              editPageData={props.editPageData}
                              setAddEditor={setAddEditor}
                            /> : null;

      return (
        <div>
          <Block item={item} handleClick={handleClick} />
          {nextEditable}
        </div>
      );
    } else {
      return (
      <div>
        <ContentEditable 
          id={'block_' + item.id}
          headId={item.head}
          inputValue={item.content}
          contentId={item.id}
          parentId={item.parent}
          childId={item.child}
          contentType={item.content_type}
          updateContent={updateContent}
        />
      </div>
      );
  }
}
