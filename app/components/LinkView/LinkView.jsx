import React, { useState, useEffect } from 'react';
import axios from "axios";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FileView from "../FileView/FileView"


const useStyles = makeStyles(theme => ({
linkView: {
    cursor:  'pointer',
    width: '100%',
    overflow: 'hidden',
    padding: '30px',
    marginLeft: '30px',
},
img: {
    maxWidth: '400px',
},
notSupported: {
  color: 'crimson',
  fontSize: '15px',
},
}));

function LinkBlock(props) {
    const classes = useStyles();
    console.log(props.link);
    if (!props.link) {
        return null;
    }
    switch(props.link.type) {
      case "file": return (
        <FileView file={props.link.metadata} />);
      default: return (
        <div className={classes.notSupported}>
          {'Link view not supported!'}
        </div>);
    };
  }

export default function LinkView(props) {
    const classes = useStyles();
    const [link, setLink] = useState({});
    
    useEffect(() => {
      if (props.link) {
        let api_end = `http://localhost:8000/api/link/${props.link}`;
        axios.get(api_end).then((response)=>{
          let data = response.data[props.link];
          setLink(data);
        });
      }
    }, []);

    return (
        <Box className={classes.linkView}>
          <LinkBlock
            link = {link}
          />
        </Box>
    );
}