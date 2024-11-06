import React from "react";

import CancelOrderButton from "./CancelOrderButton";
import AcceptOrderButton from "./AcceptOrderButton";

const AcceptOrder = ({ order, setOrders }) => {
  return (
    <td>
      {order.status === "confirmed" ? (
        <CancelOrderButton order={order} setOrders={setOrders} />
      ) : order.status === "pending" ? (
        <AcceptOrderButton order={order} setOrders={setOrders} />
      ) : order.status === "delivered" ? (
        <span className="text-green-500 border border-green-500 px-2.5 py-2 rounded-lg">
          Delivered
        </span>
      ) : (
        <span className="text-red-500 border border-red-500 px-2.5 py-2 rounded-lg">
          Canceled
        </span>
      )}
    </td>
  );
};

export default AcceptOrder;
