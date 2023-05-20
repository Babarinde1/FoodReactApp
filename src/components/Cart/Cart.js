import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../stores/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const Cartcxt = useContext(CartContext);
  const totalAmount = `$${Cartcxt.totalAmount.toFixed(2)}`;

  const addSubmitHandler = (item) => {
    Cartcxt.addItem({...item, amount:1});
  };
  const removeSubmitHandler = (id) => {
    Cartcxt.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Cartcxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addSubmitHandler.bind(null, item)}
          onRemove={removeSubmitHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const hasAddItem = Cartcxt.items.length > 0;
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasAddItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
