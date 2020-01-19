import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FormControl, Button, Grid, List, ListItem, ListItemText, Typography }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import FileView from "../FileView/FileView";


const useStyles = makeStyles(theme => ({
    fileInput: {
        cursor:  'pointer',
      },
    selected: {
      background: 'silver',
      '&:hover': {
        background: 'silver',
      }
    }
    }));

export default function UploadFile(props) {
    const classes = useStyles();
    const [csrfToken, setCsrf] = useState(Cookies.get('csrftoken'));
    const [file, setFile] = useState([]);
    const [link, setLink] = useState([]);
    const [clicked, setClicked] = useState({});

    useEffect(() => {
      if (props.directory) {
        let api_end = `http://localhost:8000/api/files/${props.directory}`;
        axios.get(api_end).then((response)=>{
          setLink(response.data);
        });
      }
    }, []);


    const onFormSubmit = (e) => {
      e.preventDefault();
      fileUpload(file[0]).then((response) => {
        console.log('post_data_Response>>', response.data);
      })
      .catch((error) => {
        console.log('ERROR!!!', error);
      });
    }

    const handleFileChosen = (event) => {
      let input = event.target.value;
      let files = event.target.files;
      setFile(files);
      // let fileReader = new FileReader(); 
      // fileReader.onload = (e) => {
      //   console.log(e.target);
      // }
    }

    const onClickHandler = (fileClicked) => {
      setClicked(fileClicked);
    }

    const fileUpload = (file) => {
      const url = 'http://localhost:8000/api/upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', props.directory);
      formData.append('description', 'dolor emit');
      const config = {
        headers: {
          'X-CSRFToken': csrfToken,
          'content-type': 'multipart/form-data'
        }
      }

      return axios.post(url, formData, config);
    }

    return (
        <Grid container>
          <Grid item xs={12} sm={12}>
          <FormControl>
            <input 
              type={'file'} 
              className={classes.fileInput}
              onChange={e => handleFileChosen(e)}
              encType="multipart/form-data" 
              multiple/>
          </FormControl>
          <Button variant="contained" color="secondary" onClick={onFormSubmit}>Submit</ Button>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Grid container>
            <Grid item xs={3} sm={4}>
              <List>
                {link.map((data) => {
                  return (
                  <ListItem 
                    key={data.id} 
                    onClick={() => onClickHandler(data)} 
                    className={(clicked.id===data.id) ? classes.selected : ''}
                    button>
                    {/* <ListItemText 
                      primary={data.file_name}
                      noWrap
                    /> */}
                    <Typography noWrap={true}>{data.file_name}</Typography> 
                  </ListItem>
                    )
                })}
              </List>
            </Grid>
            <Grid item xs={9} sm={8}>
                <FileView file={clicked}  />
            </Grid>
          </Grid>
          </Grid>
        </Grid>
    );
}