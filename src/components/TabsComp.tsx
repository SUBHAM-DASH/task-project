import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Nav } from "react-bootstrap";

const TabsComp = ({ staticData }) => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Activity" />
          <Tab value="two" label="Email Maintaince" />
        </Tabs>
        <hr />
        <div>
          {value === "one" && (
            <div>
              <div>
                {staticData.map((item, index) => {
                  return (
                    <div key={index}>
                        <div className="d-flex justify-content-between">
                            <span>{item?.date.toLocaleString()??""}</span>
                            <div className="d-flex gap-3">
                                <Nav.Link href="#" className="text-primary">Edit</Nav.Link>
                                <Nav.Link href="#" className="text-primary">Delete</Nav.Link>
                            </div>
                        </div>
                      <div className="card bg-dark-subtle text-emphasis-dark mb-3">
                        <div className="card-body">{item.text ?? ""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {value === "two" && <div>Email Maintaince</div>}
        </div>
      </Box>
    </div>
  );
};

export default TabsComp;
