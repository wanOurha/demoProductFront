import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { AddUser } from "./Service.js"
import Admin_Menu_Component from "./Admin_Menu_Component"
import LoadWhenFetch from "./LoadWhenFetch.js"

export default function Add_User_Component({ role, isLoginProp }) {
  const [userName, setuserName] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const [roles, setRoles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const roleChange = (val) => {
    setRoles(val.target.value)
  };
  return (
    <div>
      {role === "" && alert("Please Log In Before")}
      {isLoginProp == null && (
        <div>
          <h1>Please Login Before</h1>
        </div>
      )}
      {role === "user" && (
        <h1>
          <span className="role">{role}</span> role can't add user
        </h1>
      )}
      {role === "admin" && (
        <section>
          <Admin_Menu_Component />
          <h1>Manage User</h1>
          <Form
            fluid="md"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Form.Group controlId="formuserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Insert User Name"
                onChange={(event) => {
                  setuserName(event.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassWord">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Insert Password"
                onChange={(event) => {
                  setPassWord(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group name="value" type="radio">
              <Form.Label>User Role</Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="admin"
                  name="roleSelect"
                  value={"admin"}
                  id="adminSelect"
                  onChange={(event) => {
                    roleChange(event);
                  }}
                />
                <Form.Check
                  type="radio"
                  label="user"
                  name="roleSelect"
                  value={"user"}
                  id="userSelect"
                  onChange={(event) => {
                    roleChange(event);
                  }}
                />
              </Col>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={async () => {
                await setIsLoading(true)
                await AddUser(userName, passWord, roles)
                await setIsLoading(false)
              }}
            >
              Add User
            </Button><span><LoadWhenFetch action={isLoading} /></span>
          </Form>
        </section>
      )}
    </div>
  );
}
