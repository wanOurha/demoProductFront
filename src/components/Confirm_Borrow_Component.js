import React from "react";
import {
  UpdateBorrowStatusAndBorrowStock,
  UpdateBorrowStatusAndReurnStock,
  UpdateBorrowStatusAndReject,
} from "./Service";
import { useHistory } from "react-router-dom"
import Admin_Menu_Component from "./Admin_Menu_Component"
import Loding_Component from "./Loading_Component";

export default function Confirm_Borrow_Component({
  role,
  BorrowUnconfirm,
}) {
  const history = useHistory();
  const handleUrl = () => {
    history.push("/login")
  };

  const rederBorrowTable = (BorrowUnconfirm, index) => {
    return (
      <tr key={index}>
        <td>{BorrowUnconfirm.borrow_id}</td>
        <td>{BorrowUnconfirm.user_id}</td>
        <td>{BorrowUnconfirm.product_id}</td>
        <td>{BorrowUnconfirm.borrow_amount}</td>
        <td>{BorrowUnconfirm.borrowDate}</td>
        <td>
          {returnCode(BorrowUnconfirm.is_return)}
          {BorrowUnconfirm.is_return === 0 && (
            <span>
              <button
                onClick={async () => {
                  await UpdateBorrowStatusAndBorrowStock(
                    BorrowUnconfirm.borrow_id,
                    BorrowUnconfirm.user_id,
                    BorrowUnconfirm.product_id,
                    BorrowUnconfirm.borrow_amount,
                    1
                  );
                  await handleUrl();
                }}
              >
                Confirm
              </button>
              <button
                onClick={async () => {
                  await UpdateBorrowStatusAndReject(
                    BorrowUnconfirm.borrow_id,
                    BorrowUnconfirm.user_id,
                    BorrowUnconfirm.product_id,
                    BorrowUnconfirm.borrow_amount,
                    2
                  );
                  await handleUrl();
                }}
              >
                Reject
              </button>
            </span>
          )}

          {BorrowUnconfirm.is_return === 1 && (
            <button
              onClick={async () => {
                await UpdateBorrowStatusAndReurnStock(
                  BorrowUnconfirm.borrow_id,
                  BorrowUnconfirm.user_id,
                  BorrowUnconfirm.product_id,
                  BorrowUnconfirm.borrow_amount,
                  11
                );
                await handleUrl();
              }}
            >
              Return
            </button>
          )}
        </td>
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
      {role === "admin" && (
        <section>
          <div>
            <Admin_Menu_Component />
          </div>
          {BorrowUnconfirm == null && (
            <Loding_Component/>
          )}
          {BorrowUnconfirm != null && (
            <section>
              <h1>Confirm Borrow List</h1>
              <table>
                <thead>
                  <tr>
                    <th>Borrow ID</th>
                    <th>User ID</th>
                    <th>Product ID</th>
                    <th>Borrow Amount</th>
                    <th>Borrow Date</th>
                    <th>Borrow Status</th>
                  </tr>
                </thead>
                <tbody>{BorrowUnconfirm.map(rederBorrowTable)}</tbody>
              </table>
            </section>
          )}
        </section>
      )}
    </div>
  );
}
