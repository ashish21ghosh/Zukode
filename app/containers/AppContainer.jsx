import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";
import Coretext from "../components/Coretext";
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
}));

export default function AppContainer() {
  const classes = useStyles();
  const theme = useTheme();
  
  const [drawer, setDrawer] = useState(false);


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
        <Coretext />
      </div>
      <footer style={{ textAlign: 'center' }}>
        Zukode ©2018
      </footer>
    </div>
  );
}