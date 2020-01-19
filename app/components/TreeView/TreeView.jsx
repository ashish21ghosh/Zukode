import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
/* Styles applied to the root element. */
  rootView: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    '&:focus > $content': {
      backgroundColor: theme.palette.grey[400],
    },
  },
  /* Pseudo-class applied to the root element when expanded. */
  expanded: {},
  selected: {
    backgroundColor: 'silver',
    width: '100%',
  },
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  /* Styles applied to the tree node content. */
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  /* Styles applied to the tree node icon and collapse/expand icon. */
  iconContainer: {
    marginRight: 2,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    '& .close': {
        opacity: 0.3,
    },
  },
  /* Styles applied to the label element. */
  label: {
    width: '100%',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
  },
}));

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
    in: PropTypes.bool,
};

const icons = {
  defaultExpandIcon: MinusSquare(),
  defaultCollapseIcon: PlusSquare(),
  defaultEndIcon: CloseSquare()
}

export function TreeItem(props) {
    const classes = useStyles();

    const {
        label,
        children,
        icon: iconProp,
        collapseIcon,
        endIcon,
        expandIcon,
        nodeId,
        isExpanded,
        isSelected,
    } = props;

    const expand = isExpanded ? isExpanded : false;
    const select = isSelected ? isSelected : false;
    const [expanded , togglExpand] = useState(expand);

    useEffect(() => {
      togglExpand(expand);
    }, [isExpanded]);

    function handleClick() {
      if (expandable) {
        togglExpand(!expanded);
      }
    }
    let icon = iconProp;
    const expandable = Boolean(Array.isArray(children) ? children.length : children);

    if (!icon) {
        if (expandable) {
            if (expanded) {
            icon = expandIcon || icons.defaultExpandIcon;
            } else {
            icon = collapseIcon || icons.defaultCollapseIcon;
            }

            if (!icon) {
            icon = icons.defaultParentIcon;
            }
        } else {
            icon = endIcon || icons.defaultEndIcon;
        }
    }
    return (
        <li
          className={clsx(classes.root, {
            
          })}
          aria-expanded={expandable ? expanded : null}
        >
          <div className={classes.content}>
            <div className={classes.iconContainer} onClick={handleClick}>
            {icon}
            </div>
            <Link className={clsx({
              [classes.selected]: select,
              [classes.label]: !select,
            })} href={`${nodeId}`} noWrap>
              {label}
            </Link>
            </div>
            {children && (
                <TransitionComponent
                unmountOnExit
                className={classes.group}
                in={expanded}
                component="ul"
                role="group"
                >
                {children}
                </TransitionComponent>
            )}
        </li>
    );
}



export function TreeView(props) {
  const {
    children,
    className,
    ...other
  } = props;

  const classes = useStyles();

  return (
    <ul role="tree" className={clsx(classes.rootView, className)} {...other}>
      {children}
    </ul>
  );
}

