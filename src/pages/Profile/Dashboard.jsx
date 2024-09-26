import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Order } from "./Order";

import Review from "./Review"
import { Edit } from "./Editprofile";
import { Password } from "./EditPassword";

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col>
              <h1 className="text-center">User Dashboard</h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="order" title="Order">
               <Order/>
              </Tab>
              <Tab eventKey="revciews" title="Reviews">
                  <Review/>
              </Tab>
              <Tab eventKey="edit profile" title="Edit Profile">
                <Edit/>
              </Tab>
              <Tab eventKey="change password" title="Change Password">
               <Password/>
              </Tab>
            </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
