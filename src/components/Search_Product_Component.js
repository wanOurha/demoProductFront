import React from "react"
import product_Component from "./Product_Component"
import { GetData } from "./Service";


export default function Search_Product_Component() {
  return (
    <div>
      <form
            onSubmit={(event) => {
            event.preventDefault()
            return <product_Component productDataArray={GetData(`/product/1`)}  />
        }}
      >
        <label>Select Product ID you want to borrow</label>
        <input
          type="number"
          list="data"
          id="search-id-input"
          placeholder="search by product id..."
          min="1"
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
