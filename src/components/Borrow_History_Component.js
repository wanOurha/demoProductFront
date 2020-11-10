import React from "react"
import Spinner from "react-bootstrap/Spinner"
import Loding_Component from "./Loading_Component";

export default function Borrow_History_Component({ BorrowDataArray }) {
  const rederBorrowTable = (BorrowDataArray, index) => {
    return (
      <tr key={index}>
        <td>{BorrowDataArray.borrow_id}</td>
        <td>{BorrowDataArray.product_id}</td>
        <td>{BorrowDataArray.borrow_amount}</td>
        <td>{BorrowDataArray.borrowDate}</td>
        <td>{returnCode(BorrowDataArray.is_return)}</td>
      </tr>
    );
  };

  const returnCode = (is_return) => {
    if (is_return == 0) {
      return "Not Confirm";
    }
    if (is_return == 1) {
      return "Confirm Request And Not Return";
    }
    if (is_return == 2) {
      return "Reject Request";
    }
    if (is_return == 11) {
      return "Are Return";
    }
  };

  return (
    <div>
      {BorrowDataArray == null && 
        <Loding_Component />
      }
      {BorrowDataArray != null && (
        <section>
          <h1>History</h1>
          <table>
            <thead>
              <tr>
                <th>Borrow ID</th>
                <th>Product ID</th>
                <th>Borrow Amount</th>
                <th>Borrow Date</th>
                <th>Borrow Status</th>
              </tr>
            </thead>
            <tbody>{BorrowDataArray.map(rederBorrowTable)}</tbody>
          </table>
        </section>
      )}
    </div>
  );
}
