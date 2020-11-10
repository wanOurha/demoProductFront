// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React,{useState} from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import { Login, GetData, getRole, getisLogin } from "./components/Service.js";
import ProductComponent from "./components/Product_Component";
import Home from "./components/Home"
import BorrowPage from "./components/BorrowPageComponent"
import AddEditProduct from "./components/Add_Edit_Product_Component"
import AddUser from "./components/Add_User_Component"
import ConfirmBorrow from "./components/Confirm_Borrow_Component"
import Borrow_History_Component from "./components/Borrow_History_Component"
import Search_Product_Component from "./components/Search_Product_Component";

export default function App() {
  const [role, setRole] = useState(getRole())
  return (
    <div>
      <nav class="navbox">
        <div class="logo">
          <h1>Borrow Product Program</h1>
        </div>
        <ul class="menu">
          <li>
            <Link
              exact
              to="/"
              activeClassName="is-active"
              className="navbar-item"
              class="item"
            >
              <span className="nav-item">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/product-component"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item">Product </span>
            </Link>
          </li>

          <li>
            <Link
              to="/borrow-product"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item">Borrow</span>
            </Link>
          </li>

          <li>
            <Link
              to="/borrow-productList-component"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item">History</span>
            </Link>
          </li>
          
              {/* <li>
                <Link
                  to="/confirm-borrow"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  <span className="nav-item">Confirm</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/add-edit-product"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  <span className="nav-item">Add/Edit Product</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/add-user"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  <span className="nav-item">Manage User</span>
                </Link>
              </li> */}
           
          <li>
            <Link
              to="/login"
              activeClassName="is-active"
              className="navbar-item"
            >
              <span className="nav-item-login"> Account </span>
            </Link>
          </li>
        </ul>
      </nav>
      <header>
        <section>
          <h1>How to Use</h1>
          <p>
            - <span class="activity">Click "Account"</span> to login before use
          </p>
          <p>
            - <span class="role">User</span> Can see all Product by{" "}
            <span class="activity">Click "Product"</span>. And Borrow Product by{" "}
            <span class="activity">Click "Borrow"</span>
          </p>
          <p>
            - <span class="role">Admin</span> Can Confirm borrow request by{" "}
            <span class="activity">Click "Confirm"</span> . Add and Edit product
            by <span class="activity">Click "Add/Edit Product"</span> . And
            Manage user by <span class="activity">Click "Manage User"</span>.
          </p>
        </section>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/product-component"
          component={() => (
            <ProductComponent
              productDataArray={GetData("/product")}
              isLoginProp={getisLogin()}
              status="Loading"
            />
          )}
        />
        <Route
          exact
          path="/borrow-productList-component"
          component={() => (
            
            <Borrow_History_Component
              BorrowDataArray={GetData("/borrow/user")}
              role={getRole()}
              isLoginProp={getisLogin()}
            />
          )}
        />
        <Route
          exact
          path="/login"
          component={() => <Login isLoginProp={getisLogin()} roleProp={getRole()} />}
        />
        <Route
          exact
          path="/borrow-product"
          component={() => 
            // <Search_Product_Component />
            <BorrowPage
              productDataArray={GetData("/product")}
              isLoginProp={getisLogin()}
            />
          }
        />
        <Route
          exact
          path="/add-edit-product"
          component={() => (
            <AddEditProduct role={getRole()} isLoginProp={getisLogin()} />
          )}
        />
        <Route
          exact
          path="/add-user"
          component={() => (
            <AddUser
              role={getRole()}
              isLoginProp={getisLogin()}
              isLoginProp={getisLogin()}
            />
          )}
        />
        <Route
          exact
          path="/confirm-borrow"
          component={() => (
            <ConfirmBorrow
              role={getRole()}
              BorrowUnconfirm={GetData(`/borrow/borrow-not-status`)}
              isLoginProp={getisLogin()}
            />
          )}
        />
      </Switch>
    </div>
  );
}
