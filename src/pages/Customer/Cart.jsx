import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCart, clearCart } from "../../store";

import { imgURL } from "../../library";

import { useNavigate } from "react-router-dom";

import { LoadingComponent } from "../../components";

import http from "../../http";

const Cart = () => {
  const cart = useSelector(state => state.cart.value);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState();

  const [totalQty, setTotalQty] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart) {
      let tp = 0;
      let tq = 0;
      for (let key in cart) {
        tp += cart[key].total;
        tq += cart[key].qty;
      }

      setTotalPrice(tp);
      setTotalQty(tq);
    } else {
      setTotalPrice(0);
      setTotalQty(0);
    }
  }, [cart]);

  const handleUpdateCartQty = (id, qty) => {
    let temp = { ...cart };

    let total = qty * cart[id].price;
    temp[id] = {
      ...temp[id],
      total,
      qty,
    };
    dispatch(setCart(temp));
  };

  const handleDeleteCartItem = id => {
    // console.log(id);

    // console.log("clicked");

    let temp = {};

    for (let k in cart) {
      if (k != id) {
        temp = {
          ...temp,
          [k]: cart[k],
        };
      }
    }

    if (Object.values(temp).length > 0) {
      dispatch(setCart(temp));
    } else {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    // console.log("Hello");

    setLoading(true);

    let data = [];
    for (let k in cart) {
      data.push({
        productId: k,
        qty: cart[k].qty,
      });
    }

    http
      .post("/checkout", data)
      .then(() => {
        dispatch(clearCart());
        navigate("/");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  //   console.log(Object.values(cart));

  return (
    <div>
      <div class="col-12">
        <div class="row">
          <div class="col-12 mt-3 text-center text-uppercase">
            <h2>Shopping Cart</h2>
          </div>
        </div>

        <main class="row">
          <div class="col-12 bg-white py-3 mb-3">
            <div class="row">
              {loading ? (
                <LoadingComponent />
              ) : cart ? (
                <div class="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive ">
                  <div class="row">
                    <div class="col-12 ">
                      <table class="table table-striped table-hover table-sm">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th></th>
                          </tr>
                        </thead>

                        {Object.values(cart).map((item, index) => (
                          <>
                            {/* {console.log(item.total)} */}

                            <tbody>
                              <tr key={item.product._id}>
                                <td>
                                  <img
                                    src={imgURL(item.product.images[0])}
                                    class="img-fluid me-2"
                                  />
                                  {item.product.name}
                                </td>
                                <td>
                                  Rs
                                  {item.product.discountedPrice > 0
                                    ? item.product.discountedPrice
                                    : item.product.price}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.qty}
                                    onChange={({ target }) =>
                                      handleUpdateCartQty(
                                        item.product._id,
                                        parseInt(target.value)
                                      )
                                    }
                                  />
                                </td>
                                <td>Rs {item.total}</td>
                                <td>
                                  <button
                                    class="btn btn-link text-danger "
                                    onClick={() =>
                                      handleDeleteCartItem(item.product._id)
                                    }
                                  >
                                    <i class="fas fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </>
                        ))}
                        <tfoot>
                          <tr>
                            <th colspan="2" class="text-right">
                              Total
                            </th>
                            <th>{totalQty}</th>
                            <th>{totalPrice}</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div class="col-12 text-right">
                      <button
                        class="btn btn-outline-secondary me-3"
                        type="submit"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCheckout}
                        class="btn btn-outline-success"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <h4 className="text-center">Shopping Cart is Empty</h4>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cart;
