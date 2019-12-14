import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Content from "./Content/Content";
import ContentEditable from "./ContentEditable/ContentEditable"; 
import ContentNav from "./ContentNav"; 
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
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

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function SimpleBreadcrumbs(props) {
  return (
    <Breadcrumbs  aria-label="breadcrumb">
    {props.breadcrumbs.map(item => {
      return (
      <Link 
        color="inherit" 
        href="#" 
        onClick={handleClick}
        key={item.id}
      >
        {item.content}
      </Link>
      );
    })}
    <Typography color="textPrimary">Belts</Typography>
    </Breadcrumbs>
  );
}


export default function Coretext(props) {
  const [pageData, setPageData] = useState({});
  const [coretextParent, setCoretextParent] = useState({});
  const [coreheadParent, setCoreheadParent] = useState({});
  const [content, setContent] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [headList, setHeadList] = useState([]);
  const [breadList, setBreadList] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  useEffect(() => {
    let api_end = 'http://localhost:8000/api/coretext'
    if (HEAD_ID) {
      api_end = api_end + `/${HEAD_ID}`;
    }
    axios.get(api_end).then((response)=>{
      setPageData(response.data);
    });
  }, []);

  useEffect(() => {
    createContent(pageData);
  }, [pageData]);

  const classes = useStyles();
  const editPageData = (new_elem) => {
    let elem_content_type = new_elem.content_type;
    let elem_parent = new_elem.parent;
    let elem_id = new_elem.id;

    let page_data = pageData;

    if (elem_content_type != 'head') {
      let elem_head = new_elem.head;
      page_data["data"][elem_head]["data"][elem_id] = new_elem;
      page_data["data"][elem_head]["data"][elem_parent].child = elem_id;
    } else {
      page_data["head"][elem_id] = new_elem;
      if (elem_parent) {
        page_data["head"][elem_parent]['child'] = elem_id;
      }
      this.props.nav(new_elem);
    }
    setPageData(page_data);
  }

  const createContent = (page_data) => {
    const pageData = page_data["data"];
    const headData = page_data["head"];
    const pageLevel = page_data["pageLevel"];
    const bread_list = (page_data["breadcrump"] == undefined) ? [] : page_data["breadcrump"];

    let base_head = [];
    if (headData) {
      Object.entries(headData).forEach(
          ([key, val]) => {
            if (val['level'] === pageLevel){
              base_head.push(val);
            }
          }
      )
    }

    let content = [];
    let head_list = [];
    let coretext_parent = {};
    let corehead_parent = {};
    base_head.map((head) => {
      while (head) {
        head['content_type'] = 'head'
        content.push(head);
        head_list.push(head);
        corehead_parent = head;
        coretext_parent = {};
        const head_id = head.id;
        
        if (pageData[head_id]) {
          const data_head_id = pageData[head_id]["head"];
          const data_dict = pageData[head_id]["data"];
          if (data_dict && data_dict[data_head_id]) {
            let nextChild = data_dict[data_head_id];
            while (nextChild) {      
              content.push(nextChild);
              coretext_parent = nextChild;
              nextChild = data_dict[nextChild.child];
            } 
          }
        }
        let head_child = head.child;
        head = headData[head_child];
      }
    });
    setCoretextParent(coretext_parent);
    setCoreheadParent(corehead_parent);
    setContent(content);
    setHeadList(head_list);
    setBreadList(bread_list);
  }

  return (
    <Grid container spacing={1}>
    <Grid item xs={12} sm={12}>
      <SimpleBreadcrumbs breadcrumbs={breadList} />
    </Grid>
    
    <Paper className={classes.padding}>
      <Grid item xs={12} sm={12}>
      <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={tabValue} onChange={handleChange} aria-label="ant example">
          <AntTab label="Content" />
          <AntTab label="Upload" />
          <AntTab label="Links" />
        </AntTabs>
        <Typography className={classes.padding} />
      </div>
    </div>
    </Grid>
    <Grid container>
    <Grid item xs={9} sm={9}>
        <Content 
          content={content}
        />
        <ContentEditable 
          parent={coretextParent}
          head={coreheadParent}
          editPageData={editPageData}
          pageLevel={props.pageLevel}
        />
        </Grid>
        <Grid item xs={3} sm={3}>
        <ContentNav
          coreHead={coreheadParent}
          headList={headList}
        />
          </Grid>
          </Grid>
      </Paper>
      </Grid>
  );
}

