import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import Loding_Component from "./Loading_Component.js"
import {Borrow} from "./Service"
export default function BorrowPageComponent({
  productDataArray,
  
}) {
  const [dataSelect, setDataSelect] = useState(null);
  const history = useHistory();
  const handleUrl = () => {
    history.push("/borrow-productList-component");
    history.goBack()
  };
  var itemSelect = null
  const labelStyles1 = {
    color: "black",
    padding: "10px",
    fontFamily: "Arial",
  };
  const inputStyles = {
    textalign: "center",
    width: "20%",
  };

  const borrowBtn = {
    textalign: "center",
    color: "green",
  };

  const rederNameList = (productDataArray, index) => {
    itemSelect = productDataArray[index]
    return <option key={index} value={productDataArray.product_id}></option>
  }

  const rederDataSelectTable = (dataSelect, index) => {
    return (
      <tr key={index}>
        <td>{dataSelect.product_id}</td>
        <td>{dataSelect.name}</td>
        <td>{dataSelect.stock}</td>
        <td>{dataSelect.price}</td>
      </tr>
    );
  };
  const borrowClick = () => {
    let borrowAmount 
    if (document.getElementById("quantity").value <= 0) {
      borrowAmount = document.getElementById("quantity").defaultValue = 1;
      Borrow(
        dataSelect.map((data) => data.product_id)[0],
        dataSelect.map((data) => data.name)[0],
        parseInt(borrowAmount)
      );
    } else {
      borrowAmount = document.getElementById("quantity").value;
      Borrow(
        dataSelect.map((data) => data.product_id)[0],
        dataSelect.map((data) => data.name)[0],
        parseInt(borrowAmount)
      );
    }
    setDataSelect(null);
  };
  return (
    <div>
      {productDataArray == null && <Loding_Component />}
      {productDataArray !== null && (
        <section>
          <h1>Borrow Product</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              itemSelect = document.getElementById("search-id-input").value
              if (
                productDataArray.filter(
                  (item) => item.product_id == itemSelect
                )[0] !== undefined
              ) {
                setDataSelect(
                  productDataArray.filter(
                    (item) => item.product_id == itemSelect
                  )
                )
                
              } else {
                setDataSelect(null);
              }
            }}
          >
            <label style={labelStyles1}>
              Select Product ID you want to borrow
            </label>
            <input
              type="number"
              list="data"
              id="search-id-input"
              placeholder="search by product id..."
              
              min="1"
              readonly
              style={inputStyles}
            />
            <datalist id="data">{productDataArray.map(rederNameList)}</datalist>
            <input type="submit" value="Search" />
            {dataSelect == null && (
              <section>
                <h1>Product not found.</h1>
              </section>
            )}
            {dataSelect !== null && (
              <section>
                <h1>Product Detail</h1>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>stock</th>
                      <th>price</th>
                    </tr>
                  </thead>
                  <tbody>{dataSelect.map(rederDataSelectTable)}</tbody>
                </table>
                <label style={labelStyles1}>Quantity (between 1 and 10):</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  defaultValue="1"
                  readonly
                ></input>
                <button
                  onClick={async (event) => {
                    await borrowClick();
                    await handleUrl();
                  }}
                  style={borrowBtn}
                >
                  Borrow
                </button>
              </section>
            )}
          </form>
        </section>
      )}
    </div>
  );
}
