import React from "react";
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
// web.cjs is required for IE 11 support
import { useSpring, animated } from 'react-spring/web.cjs';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';

import { TreeItem, TreeView } from "./TreeView/TreeView";



function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles(theme => ({
  content: {
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    }
  },
  label: {
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    }
  },
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent}/>);

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function LeftBar(props) {
  const classes = useStyles();
  const {
    selectedList
  } = props;

  console.log('selectedList', selectedList);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, this);
  };

  const isExpanded = (nodeId, list) => {
    return list.includes(nodeId);
  }

  const createTree = (data) => {
    return (
      data.map((node) => {
        return createNode(node);
      })
    );
  }

  const createNode = (data) => {
    if (data.nodes) {
      return (
          <TreeItem 
            label={ data.content } 
            key={data.id} 
            nodeId={`${data.id}`}
            isExpanded={isExpanded(data.id, selectedList)}
          >
            {createTree(data.nodes)}
          </TreeItem>
      );
    } else {
      return (
          <TreeItem 
            label={ data.content } 
            key={data.id} 
            nodeId={`${data.id}`} 
          />
      
      )
    }
  }
    const data = props.headData["data"];
    const head = props.headData["head"];

    let content = [];
    if (head) {
      head.map(
        (data_id) => {
          let val = data[data_id];
          content.push(val);

          let nextChild = data[val.child];
          while(nextChild) {
            content.push(nextChild);
            nextChild = data[nextChild.child];
          }
        }
      )
    }

    let itemsToIterate = content.slice(0).reverse();
    
    let level = -1;
    let prev_level = -1;
    let stack = [[]];

    for (let i = 0, len = itemsToIterate.length; i < len; i++) {
      let item = itemsToIterate[i];
      prev_level = level;
      level = item.level;
      if (!stack[level]) {
        stack[level] = [];
      }
      if (prev_level <= level) {
        stack[level].unshift(item);
      } else {
        item.nodes = stack[prev_level];
        stack[prev_level] = [];
        stack[level].unshift(item);
      }

    }
    level = (level === -1) ? 0 : level;
    let tree = createTree(stack[level]);

    return (
      <TreeView
        // className={classes.root}
        // defaultExpanded={[`${HEAD_ID}`]}
        // defaultCollapseIcon={<MinusSquare />}
        // defaultExpandIcon={<PlusSquare />}
        // defaultEndIcon={<CloseSquare />}
        // onNodeToggle={onSelect}
      >
        {tree}
      </TreeView>
    );

}