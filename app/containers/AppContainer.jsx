import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";
import Coretext from "../components/Coretext";
import LeftBar from "../components/LeftBar";
import TopBar from "../components/TopBar";
import LeftDrawer from "../components/LeftDrawer";
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  margin: {
    marginTop: 30,
  },
}));

export default function AppContainer() {
  const classes = useStyles();
  const theme = useTheme();
  
  const [drawer, setDrawer] = useState(false);
  const [headData, setHeadData] = useState({});
  const [currentHead, setCurrentHead] = useState({});
  const [heads, setHeads] = useState([]);
  const [pageLevel, setPageLevel] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let api_end = 'http://localhost:8000/api/corehead'
    if (HEAD_ID) {
      api_end = api_end + `/${HEAD_ID}`;
    }
    axios.get(api_end).then((response)=>{
      console.log('api/corehead....',response.data);
      setHeadData(response.data);
    });
  }, []);

  const navHandler = (val) => {
    let headData = this.state.headData;
    let elem_id = val.id;
    let parent_id = val.parent;
    let level = val.level;
    headData["data"][elem_id] = val;
  
    if(parent_id) {
      headData["data"][parent_id]["child"] = elem_id;
    }
    if (level == 0) {
      headData["head"].push(elem_id);
    }
    setHeadData(headData);
  }

  const handleDrawerOpen = () => {
    setDrawer(true);
  };

  const handleDrawerClose = () => {
    setDrawer(false);
  };

  return (
      <div>
      <CssBaseline />
      <TopBar 
        drawer={drawer}
        openDrawer={handleDrawerOpen}
        closeDrawer={handleDrawerClose}
      />
      <LeftDrawer 
        drawer={drawer}
        openDrawer={handleDrawerOpen}
        closeDrawer={handleDrawerClose}
      />

      <div className={clsx(classes.content, {
          [classes.contentShift]: drawer,
        })}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <div className={classes.margin}></div>
            <LeftBar headData={headData} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Coretext 
              nav={navHandler}
              currentHead={currentHead}
              heads={heads}
              pageLevel={pageLevel}
            />
          </Grid>
        </Grid>
        </div>
        <footer style={{ textAlign: 'center' }}>
          Zukode ©2018
        </footer>
      </div>
  );
}