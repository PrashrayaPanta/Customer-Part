import { useSelector, useDispatch } from "react-redux";

import { setCart, clearCart } from "../store";
import { toast } from "react-toastify";

export const CartBtn = ({ product, quantity = 1, className   }) => {
  const cart = useSelector((state) => state.cart.value);

  // console.log(cart);

  // console.log(cart);

  // console.log(cart);

  const dispatch = useDispatch();
  // console.log(product, quantity);

  // console.log(quantity);

  // console.log(product?.name);

  const handleAddCart = () => {
    let temp = { ...cart };

    // console.log(temp);

    let price =
      product.discountedPrice > 0 ? product.discountedPrice : product.price;

    let qty = quantity;

    // console.log(product._id);

    // console.log(cart[product._id]);

    if (product._id in temp) {
      qty = qty + cart[product._id].qty;
    }

    let total = qty * price;

    temp = {
      ...temp,

      [product._id]: {
        product,
        price,
        total,
        qty: qty,
      },
    };

    dispatch(setCart(temp));
    toast.success("succesfully added to cart");
  };

  return (
    <button
      className="btn btn-outline-dark"
      type="button"
      onClick={handleAddCart}
    >
      <i className="fas fa-cart-plus me-2"></i>Add to cart
    </button>
  );
};
