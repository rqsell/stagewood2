import { useReactiveVar } from "@apollo/client";
import React from "react";

function Cart(props) {
  console.log(Cart);
  return (
    <div>
      {/* <h1>{props?.user.name} Garden</h1> */}
      {props.Cart?.map((product, idx) => (
        <div className="itembox" key={idx}>
          <h3>{product.name}</h3>
          <h4>{product.cost}</h4>
          <img className="productimg" src={product.img} />
        </div>
      ))}
    </div>
  );
}

export default Cart;
