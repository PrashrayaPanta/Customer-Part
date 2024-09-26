import React from "react";
import { imgURL } from "../library";
import { Link } from "react-router-dom";
import { CartBtn } from "../components";

const ProductCard = ({ product }) => {
  return (
    <div className="my-3 justify-content-center ">
      <div className="col-12 bg-white text-center h-100 product-item ">
        <div className="row h-100 ">
          <div className="col-12 p-0 mb-3 ">
            <Link to={`/product/${product._id}`}>
              <img
                src={imgURL(product.images[0])}
                alt=""
                srcset=""
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-12 mb-3">
            <a href="product.html" className="product-name">
              {product.name}
            </a>
          </div>
          <div className="col-12 mb-3">
            {product.discountedPrice > 0 ? (
              <>
                <span className="text-decoration-line-through">
                  {product.price}
                </span>
                <br />
                <span className="">{product.discountedPrice}</span>{" "}
              </>
            ) : (
              <span>{product.price}</span>
            )}
          </div>

          <div className="col-12 mb-3 align-self-end">
            <CartBtn product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
