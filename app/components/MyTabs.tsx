"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export const MyTabs = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="account" title="Account">
          {/* <Card>
            <CardBody> */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          {/* </CardBody>
          </Card> */}
        </Tab>
        <Tab key="security" title="Security">
          {/* <Card>
            <CardBody> */}
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
          {/* </CardBody>
          </Card> */}
        </Tab>
      </Tabs>
    </div>
  );
};
