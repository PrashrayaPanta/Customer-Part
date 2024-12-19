import { imgURL } from "../library";
import { LoadingComponent } from "./Loading";
import ProductCard from "./ProductCard";

const ProductSection = ({ title, products = [], loading }) => {
  console.log(title);
  console.log(products);

  return (
    <div className="col-12">
      <div className="row">
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="col-12 py-3">
            <div className="row">
              <div className="col-12 text-center text-uppercase">
                <h2>{title}</h2>
              </div>
            </div>

            <div className="row row-cols-lg-4 row-cols-sm-2 justify-content-center ">
              {/* EacH Card */}

              {products.length > 0 ? (
                products.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
              ) : (
                <h1 style={{textAlign:"center"}}>No similar product</h1>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
