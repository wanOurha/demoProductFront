import React from "react"
import "./table.css"
import "./styles.css"
import Loding_Component from "./Loading_Component"

export default function product_Component({
  productDataArray,
}) {
  const rederTable = (productDataArray, index) => {
    return (
      <tr key={index}>
        <td>{productDataArray.product_id}</td>
        <td>{productDataArray.name}</td>
        <td>{productDataArray.stock}</td>
        <td>{productDataArray.price}</td>
      </tr>
    );
  };
  
  return (
    <div>
      {productDataArray == null && (
        <Loding_Component/>
      )}
      {productDataArray != null && (
        <section>
          <h1>Product List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>stock</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>{productDataArray.map(rederTable)}</tbody>
          </table>
        </section>
      )}
    </div>
  );
}
