import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css"
import Edit_Product_Component from "./Edit_Product_Component"
import { AddProduct, GetData,getisLogin } from "./Service.js"
import { useHistory } from 'react-router-dom'
import Admin_Menu_Component from "./Admin_Menu_Component"
import LoadWhenFetch from "./LoadWhenFetch.js"



export default function Add_Edit_Product_Component({ role, isLoginProp }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [searchId, setSearchId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory()
  const handleUrl = () => {
    history.push("/")
    history.goBack()
  }

   const addProduct = async  () => {
    await AddProduct(productName, price, stock);
    
  };
  return (
    <div>
      {isLoginProp == null &&
      <div>
        <h1>Please Login Before</h1>
        </div>}
      {role === "" && alert("Please Log In Before")}
      {role === "user" && (
        <h1>
          <span className="role">{role}</span> role can't add or edit product
        </h1>
      )}
      {role === "admin" && (
        <section>
          <div>
          <Admin_Menu_Component />
        </div>
          <h1>Add Product</h1>
          <Form
            fluid="md"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                placeholder="Insert Product Name"
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                placeholder="0"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                placeholder="0"
                onChange={(event) => {
                  setStock(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                addProduct()
                handleUrl()
              }}
            >
              Add Product
            </Button>
          </Form>
          {/* <h1>Edit Product</h1>
          <label>Select Product you want to Edit by product id</label>
          <input
            type="number"
            list="data"
            id="search-id"
            placeholder="1"
            min="1"
            
          />
          <button
            onClick={async () =>{
              await setIsLoading(true)
              await setSearchId(document.getElementById("search-id").value)
              await setIsLoading(false)
            }}
          >
            Search
          </button> */}
          <Edit_Product_Component Data={GetData("/product")} isLoginProp={getisLogin()} isLoading={isLoading} />      
        </section>
      )}
    </div>
  );
}
