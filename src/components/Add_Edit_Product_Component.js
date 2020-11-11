import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css"
import Edit_Product_Component from "./Edit_Product_Component"
import { AddProduct, GetData,getisLogin } from "./Service.js"
import { useHistory } from 'react-router-dom'
import Admin_Menu_Component from "./Admin_Menu_Component"



export default function Add_Edit_Product_Component({ role, isLoginProp }) {
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
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
          <Edit_Product_Component Data={GetData("/product")} isLoginProp={getisLogin()} />      
        </section>
      )}
    </div>
  );
}
