import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../components";
import { ProductSection } from "../../components";
import http from "../../http";

export const Brand = () => {
  const [brand, setBrand] = useState({});

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    http
      .get(`/brands/${id}`)
      .then(({ data }) => {
        setBrand(data);
        return http.get(`/brands/${id}/products`);
      })
      .then(({ data }) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [products]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {products.length > 0 ? (
            <ProductSection
              title={`Category of ${brand.name}`}
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
