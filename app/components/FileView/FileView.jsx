import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
fileView: {
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

function FileBlock(props) {
    const classes = useStyles();
    if (!props.file.file_type) {
        return null;
    }
    switch(props.file.file_type) {
      case "image": return (
        <img src={`http://localhost:8000/api/upload/${props.file.id}`} className={classes.img}></img>);
      case "text": return (
        <div className={classes.notSupported}>
          {'File view not supported!'}
        </div>);
      case "application": return (
        <div className={classes.notSupported}>
          {'File view not supported!'}
        </div>
      );
      default: return (
        <div className={classes.notSupported}>
          {'File view not supported!'}
        </div>);
    };
  }

export default function FileView(props) {
    const classes = useStyles();
    return (
        <Box className={classes.fileView}>
            <FileBlock 
                file = {props.file}
            />
        </Box>
    );
}