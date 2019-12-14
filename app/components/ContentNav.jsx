import React, { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {HashLink} from 'react-router-hash-link';
import {BrowserRouter as Router} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    content_nav: {
      borderLeft: '1px solid rgb(216, 216, 216)',
    },
    li_link: {
      '&:hover': {
        borderLeft: '4px solid #e0e0e0',
        font: 'bold',
      },
      
    },
  }))


export default function ContentNav(props) {
  const classes = useStyles();

  // const preventDefault = event => event.preventDefault();
  
  return (
    <Router>
    <List dense={true} className={classes.content_nav}>
    {props.headList.map(item => (
      <ListItem className={classes.li_link} key={item.id}>
        <HashLink 
          to={`#${item.content.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {item.content}
        </HashLink>
      </ListItem>
    ))}
    </List>
   </Router>
    )
  }

