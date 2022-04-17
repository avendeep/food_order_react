import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForum from "./MealItemForum";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <React.Fragment>
      <li>
        <div className={styles.meal}>
          <h3>{props.name}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>{price}</div>
        </div>
        <div>
          <MealItemForum id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </React.Fragment>
  );
};

export default MealItem;
