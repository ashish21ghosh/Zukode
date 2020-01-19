import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from "axios";
import { Tabs, Tab, Input,  Typography, Breadcrumbs, Grid, Link, Paper}  from '@material-ui/core';
import Content from "./Content/Content";
import ContentEditable from "./ContentEditable/ContentEditable"; 
import Upload from "./Upload/Upload"; 
import ContentNav from "./ContentNav"; 
import LeftBar from "./LeftBar";
import PropTypes from 'prop-types';


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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
    width: '100%',
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
  margin: {
    marginTop: 30,
  },
}))


function SimpleBreadcrumbs(props) {
  const breads = props.breadcrumbs;
  const bread_len = breads.length;

  return (
    <Breadcrumbs  aria-label="breadcrumb">
    {breads.map((item, idx) => {
      if (bread_len > idx + 1) {
        return (
          <Link 
            color="inherit" 
            href={`${item.id}`}
            key={item.id}
          >
            {item.content}
          </Link>
          );
      } else {
        return (
          <Typography color="textPrimary" key={item.id}>{item.content}</Typography>
        );
      }

    })}
    
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
  const [headData, setHeadData] = useState({});
  const [pageLevel, setPageLevel] = useState(0);
  const [selectedList, setSelectedList] = useState([]);

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
    let api_end = 'http://localhost:8000/api/corehead'
    axios.get(api_end).then((response)=>{
      setHeadData(response.data);
    });
  }, []);

  useEffect(() => {
    createContent(pageData);
  }, [pageData]);

  const classes = useStyles();

  const navHandler = (val) => {
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

  const editPageData = (new_elem) => {
    let elem_content_type = new_elem.content_type;
    let elem_parent = new_elem.parent;
    let elem_child = new_elem.child;
    let elem_id = new_elem.id;
    console.log('old_page_data:', pageData);
    let page_data = JSON.parse(JSON.stringify(pageData));

    if (elem_content_type != 'head') {
      let elem_head = new_elem.head;
      if (!page_data["data"][elem_head]){
        page_data["data"][elem_head] = {
          "data": {},
          "head": elem_id
        };
      }
      page_data["data"][elem_head]["data"][elem_id] = new_elem;
      if (page_data["data"][elem_head]["data"][elem_parent]) {
        page_data["data"][elem_head]["data"][elem_parent].child = elem_id;
      } else {
        page_data["data"][elem_head]["head"] = elem_id;
      }
      if (page_data["data"][elem_head]["data"][elem_child]) {
        page_data["data"][elem_head]["data"][elem_child].parent = elem_id;
      }
    } else {
      page_data["head"][elem_id] = new_elem;
      if (elem_parent) {
        page_data["head"][elem_parent]['child'] = elem_id;
      }
      navHandler(new_elem);
    }
    console.log('new_page_data:', page_data);
    setPageData(page_data);
  }

  const createContent = (page_data) => {
    const pageData = page_data["data"];
    const headData = page_data["head"];
    let pageLevel = page_data["pageLevel"];
    const bread_list = (page_data["breadcrump"] == undefined) ? [] : page_data["breadcrump"];
    let selected_list = bread_list.map((item) => {
      return item.id;
    });
    if (selected_list.length) {
      selected_list.pop();
    }

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
    if (HEAD_ID) {
      pageLevel += 1;
    }
    setPageLevel(pageLevel);
    setCoretextParent(coretext_parent);
    setCoreheadParent(corehead_parent);
    setContent(content);
    setHeadList(head_list);
    setBreadList(bread_list);
    setSelectedList(selected_list);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={2} sm={2}>
        <div className={classes.margin}></div>
        <LeftBar headData={headData} selectedList={selectedList} headId={HEAD_ID} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <SimpleBreadcrumbs breadcrumbs={breadList} />
      <Grid container spacing={1}>
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
    
    <TabPanel index={0} value={tabValue}>
    <Grid container>
      <Grid item xs={9} sm={9}>
        <Content 
          content={content}
          editPageData={editPageData}
          writable={props.writable}
          pageLevel={pageLevel}
        />
        <ContentEditable 
          parent={coretextParent}
          head={coreheadParent}
          editPageData={editPageData}
          pageLevel={pageLevel}
          writable={props.writable}
        />
        </Grid>
        <Grid item xs={3} sm={3}>
        <ContentNav
          coreHead={coreheadParent}
          headList={headList}
        />
        </Grid>
        </Grid>
      </TabPanel>
      <TabPanel index={1} value={tabValue}>
        <Upload directory={HEAD_ID} />
      </TabPanel>
      <TabPanel index={2} value={tabValue}>
      </TabPanel>
      </Paper>
      </Grid>
      </Grid>
      </Grid>
  );
}

