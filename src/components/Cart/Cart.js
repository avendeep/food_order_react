import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit,seDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout((prevState) => !prevState);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-423f4-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    seDidSubmit(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = <React.Fragment>
 {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckOut && modalActions}
  </React.Fragment>

const isSubmittingModalContent =<p>Sending order data...</p>
const didSubmitModalContent =<p>Order Successfull..!</p>

  return (
    <Modal onClose={props.onHideCart}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
