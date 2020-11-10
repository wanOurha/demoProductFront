import React, { useState } from "react"
import { EditProduct } from "./Service"
import LoadWhenFetch from "./LoadWhenFetch.js"
import { useHistory } from 'react-router-dom'

export default function Edit_Product_Component({ Data }) {
  const [dataSelect, setDataSelect] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const history = useHistory()
  const handleUrl = () => {
    history.push("/borrow-productList-component");
    history.goBack()
  }
  var itemSelect = null;

  const labelStyles1 = {
    color: "black",
    padding: "10px",
    fontFamily: "Arial",
  };
  const inputStyles = {
    textalign: "center",
    width: "20%",
  };

  const rederNameList = (productDataArray, index) => {
    itemSelect = productDataArray[index];
    return <option key={index} value={productDataArray.product_id}></option>;
  };

  return (
    <div>
      {Data == null && <LoadWhenFetch action={true} />}
      {Data !== null && (
        <section>
          <h1>Edit Product</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              itemSelect = document.getElementById("search-id-input").value;
              if (
                Data.filter((item) => item.product_id == itemSelect)[0] !==
                undefined
              ) {
                setDataSelect(
                  Data.filter((item) => item.product_id == itemSelect)
                );
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
            <datalist id="data">{Data.map(rederNameList)}</datalist>
            <input type="submit" value="Search" />
          </form>
          {dataSelect == null && <h3>Not found product</h3>}
      {dataSelect != null && (
        <section class="edit-product-styles">
          <h4>
            Product ID : <span class="redText">{dataSelect[0].product_id}</span>{" "}
          </h4>
          <label>
            Product Name : <span class="redText">{dataSelect[0].name}</span>{" "}
          </label>
          <span> New name : </span>
          <input id="new-name" placeholder={dataSelect[0].name}></input>
          <br />
          <label>
            Product Stock : <span class="redText">{dataSelect[0].stock}</span>{" "}
          </label>
          <span> New Stock : </span>
          <input type="number" id="new-stock" placeholder={0}></input>
          <br />
          <label>
            Product Price : <span class="redText">{dataSelect[0].price}</span>
          </label>
          <span> New Price : </span>
          <input type="number" id="new-price" placeholder={0}></input>
          <br />
          <button
            onClick={async () => {
              await setisLoading(true);
              await EditProduct(
                dataSelect.product_id,
                document.getElementById("new-name").value,
                document.getElementById("new-price").value,
                document.getElementById("new-stock").value
              );
              await setisLoading(false);
            }}
          >
            {" "}
            Edit Product{" "}
          </button>
          <span>
            <LoadWhenFetch action={isLoading} />
          </span>
        </section>
      )}
        </section>
      )}
      
    </div>
  );
}
