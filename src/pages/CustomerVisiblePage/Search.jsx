import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductSection } from "../../components";
import http from "../../http";

import { LoadingComponent } from "../../components";

const Search = () => {
  const [query] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  //   console.log(products);

  useEffect(() => {
    // setLoading(true);
    http
      .get(`/products/search?term=${query.get("term")}`)
      .then(({ data }) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [products, query.get("term")]);

  //   console.log(products);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {products.length > 0 ? (
            <ProductSection
              title={`Search  ${query.get("term")}`}
              products={products}
            />
          ) : (
            <h1 className="text-center">Data Not avyavbaile</h1>
          )}
        </>
      )}
    </>
  );
};

export default Search;
