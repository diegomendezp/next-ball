import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withThemeConsumer } from '../../theme';
import { ThemeProvider } from "@material-ui/styles";
import Record from './Record';
import Statistics from './Statistics';
import MyMatches from './MyMatches';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      className="panel"
    >
      <Box p={3} className="panel">{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      width: "55%",
      margin: "0 0 2% 0"
    }
  },
  panel: {
    paddingLeft: 0,
    paddingRight: 0,
    overflowY:"scroll",
    maxHeight: "80vh"
  }
}));

function ProfileTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Record" {...a11yProps(0)} />
          <Tab label="My matches" {...a11yProps(1)} />
          <Tab label="Statistics" {...a11yProps(2)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.panel}>
      <Record  />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.panel}>
        <MyMatches />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.panel}>
        <Statistics />
      </TabPanel>
    </div>
  );
}

export default withThemeConsumer(ProfileTabs)