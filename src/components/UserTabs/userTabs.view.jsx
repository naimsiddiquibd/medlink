import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import PropsType from "prop-types";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const UserTabs = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const styles = {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };
  const mobileView = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ width: `${mobileView ? "90%" : "850px"}`, margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile={true}
          aria-label="basic tabs"
        >
          {props.tabsData.map((tab) => (
            <Tab label={tab.name} key={tab.name} sx={styles} />
          ))}
        </Tabs>
      </Box>
      {props.tabsData.map((tab, i) => (
        <TabPanel value={value} index={i} key={tab.name}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default UserTabs;

UserTabs.prototype = {
  tabsData: PropsType.arrayOf({
    name: PropsType.string,
    component: PropsType.node,
  }),
};
