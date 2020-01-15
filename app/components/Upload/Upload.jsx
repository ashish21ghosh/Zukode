import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { FormControl, Button }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    fileInput: {
        cursor:  'pointer',
      },
    }));

export default function UploadFile(props) {
    const classes = useStyles();
    const [csrfToken, setCsrf] = useState(Cookies.get('csrftoken'));
    const [file, setFile] = useState([]);
    const [path, setPath] = useState(null);

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
      setPath(input);
      setFile(files);
      let fileReader = new FileReader(); 
      fileReader.onload = (e) => {
        console.log(e.target);
      }
    }

    const fileUpload = (file) => {
      const url = 'http://localhost:8000/api/upload';
      const formData = new FormData();
      formData.append('file_name', file);

      const config = {
        headers: {
          'X-CSRFToken': csrfToken,
          'content-type': 'multipart/form-data'
        }
      }

      return axios.post(url, formData, config);
    }

    return (
        <div>
        <FormControl>
          <input 
            type={'file'} 
            className={classes.fileInput}
            onChange={e => handleFileChosen(e)}
            encType="multipart/form-data" 
            multiple/>
        </FormControl>
          <Button variant="contained" color="secondary" onClick={onFormSubmit}>Submit</ Button>
       </div>
    );
}