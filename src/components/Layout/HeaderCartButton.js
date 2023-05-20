import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import cartContext from "../../stores/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartContext);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + Number(item.amount);
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 1) {
      return;
    }
    setIsHighlighted(true);
    const timer = setTimeout(() => {
      setIsHighlighted(false)
    }, 300);

    return ()=>{
      setTimeout(timer)
    }
  }, [cartCtx.items]);

  const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
