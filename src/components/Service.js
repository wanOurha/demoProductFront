import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loding_Component from "./Loading_Component";

var URL = "";
var user_id = "";
var token = "";
var AuthHeader = {
  headers: { Authorization: `Bearer ` + token },
};
var role = "";
var isLogin = null;
var user = "";
var pass = "";

function getRole() {
  return role;
}

function getisLogin() {
  return isLogin;
}

function GetData(url) {
  const [fetchDataArray, setfetchDataArray] = useState(null);
  const history = useHistory();
  const handleUrltoLogin = () => {
    history.push("/login");
  }
  if (url === "/borrow/user") {
    URL = `/borrow/user/${user_id}`;
  } else {
    URL = url;
  }

  useEffect(() => {
    axios
      .get(URL, AuthHeader)
      .then(async (result) => {
        let { data } = result;
        await setfetchDataArray(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(`Click "Account" to Log in`);
          isLogin = null;
          role = "";
          handleUrltoLogin();
        }
      });
    return () => {};
  }, [URL]);


  return fetchDataArray;
}

function Login({ isLoginProp, roleProp }) {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setloginLoading] = useState(false);

  const history = useHistory();
  const handleUrl = () => {
    history.push("/");
    history.goBack();
  };
  function loginProcess() {
    Loging();
  }

  async function LogOut() {
    confirmAlert({
      title: "Confirm to Logout",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            token = "";
            user_id = "";
            role = "";
            isLogin = null;
            user = "";
            pass = "";
            AuthHeader = {
              headers: { Authorization: `Bearer ` + token },
            };
            handleUrl();
          },
        },
        {
          label: "No",
          onClick: () => handleUrl(),
        },
      ],
    });
  }

  async function Loging() {
    setloginLoading(true);
    await axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        token = response.data.token;
        user_id = response.data.user_id;
        role = response.data.role;
        user = username;
        pass = password;
        isLogin = true;

        AuthHeader = {
          headers: { Authorization: `Bearer ` + token },
        };
        handleUrl();
        setloginLoading(false);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("username or password are wrong");
          setloginLoading(false);
        }
      });
  }
  return (
    <div>
      {isLoginProp === null && (
        <Container>
          <h1>Log in </h1>
          <Form
            fluid="md"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Form.Group controlId="formBasicUsername">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="User Name"
                onChange={(event) => {
                  setUsename(event.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password-input"
                type="password"
                placeholder="Password....character lenght than 8"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              id="login-click"
              onClick={() => loginProcess()}
            >
              Login
            </Button>
            {loginLoading == true && <Loding_Component />}
          </Form>
          <h4 className="contact-admin-massage">
            or Register. Please contact admin.
          </h4>
        </Container>
      )}
      {isLoginProp === true && (
        <div>
          <h1>
            Role : <span class="user-detail">{role}</span>
          </h1>
          <h1>
            User Name: <span class="user-detail">{user}</span>
          </h1>
          <button onClick={() => LogOut()}>Log out</button>
        </div>
      )}
      {roleProp == "admin" && (
        <div>
          <DropdownButton id="dropdown-item-button" title="ADMIN menu">
            <Dropdown.Item as="button">
              <Link
                to="/confirm-borrow"
                activeClassName="is-active"
                className="navbar-item"
              >
                <span className="nav-item">Confirm</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Link
                to="/add-edit-product"
                activeClassName="is-active"
                className="navbar-item"
              >
                <span className="nav-item">Add/Edit Product</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Link
                to="/add-user"
                activeClassName="is-active"
                className="navbar-item"
              >
                <span className="nav-item">Manage User</span>
              </Link>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      )}
    </div>
  );
}

function Borrow(productId, names, borrowAmount) {
  axios
    .post(
      `/borrow/postborrow`,
      {
        user_id: user_id,
        product_id: productId,
        borrow_amount: parseInt(borrowAmount),
        is_return: 0,
      },
      AuthHeader
    )
    .then(
      alert("Borrow ProductID: " + productId + " name: " + names + " Success")
    );
}

function AddProduct(productNames, prices, stocks) {
  axios
    .post(
      `/product`,
      {
        name: productNames,
        price: prices,
        stock: stocks,
      },
      AuthHeader
    )
    .then((result) => {
      alert("Add product success");
      console.log(result.status);
    })
    .catch((error) => {
      if (error.message == "Request failed with status code 400") {
        alert("please insert product name");
      }
    });
}

async function AddUser(usernames, passwords, roles) {
  await axios
    .post("/auth/register", {
      username: usernames,
      password: passwords,
      role: roles,
    })
    .then((result) => {
      alert("Add user: " + usernames + " Success.")
      
    })
    .catch((error) => {
      if (error.response.status == 400) {
        alert("user already exists or password are not than 8 digit")
        
      }
      if (error.response.status == 404) {
        alert("Please Log in before")
        
      }
    })
    
}

function UpdateBorrowStatusAndBorrowStock(
  borrowID,
  userId,
  productId,
  borrowAmount,
  newStatus
) {
  axios
    .put(
      `/borrow/${borrowID}`,
      {
        user_id: userId,
        product_id: productId,
        borrow_amount: borrowAmount,
        is_return: parseInt(newStatus),
      },
      AuthHeader
    )
    .then(() => {
      alert(parseInt(newStatus));
    });
  axios
    .put(
      `/product/${productId}/set-amount-borrow`,
      {
        stock: borrowAmount,
      },
      AuthHeader
    )
    .then((result) => {
      alert("Update: " + result);
    });
}

function UpdateBorrowStatusAndReurnStock(
  borrowID,
  userId,
  productId,
  borrowAmount,
  newStatus
) {
  axios
    .put(
      `/borrow/${borrowID}`,
      {
        user_id: userId,
        product_id: productId,
        borrow_amount: borrowAmount,
        is_return: parseInt(newStatus),
      },
      AuthHeader
    )
    .then(() => {
      alert(parseInt(newStatus));
    });
  axios
    .put(
      `/product/${productId}/set-amount-return`,
      {
        stock: borrowAmount,
      },
      AuthHeader
    )
    .then((result) => {
      alert("Update: " + result);
    });
}

function UpdateBorrowStatusAndReject(
  borrowID,
  userId,
  productId,
  borrowAmount,
  newStatus
) {
  axios
    .put(
      `/borrow/${borrowID}`,
      {
        user_id: userId,
        product_id: productId,
        borrow_amount: borrowAmount,
        is_return: parseInt(newStatus),
      },
      AuthHeader
    )
    .then(() => {
      alert(parseInt(newStatus));
    });
}

async function EditProduct(productId, productNames, prices, stocks) {
  await axios
    .put(
      `/product/${productId}`,
      {
        name: productNames,
        price: prices,
        stock: stocks,
      },
      AuthHeader
    )
    .then(() => {
      alert("Edit product: " + productId + " Success")
    })
    .catch((error) => {
      if (error.message == "Request failed with status code 400") {
        alert(error.message);
      }
    })
    return 
}

export {
  Login,
  GetData,
  Borrow,
  getRole,
  getisLogin,
  AddProduct,
  AddUser,
  UpdateBorrowStatusAndBorrowStock,
  UpdateBorrowStatusAndReurnStock,
  UpdateBorrowStatusAndReject,
  EditProduct,
};
