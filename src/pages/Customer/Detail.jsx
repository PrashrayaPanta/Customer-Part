import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat, imgURL } from "../../library";
import ProductSection from "../../components/ProductSection";
import { useSelector } from "react-redux";
import { CartBtn } from "../../components";
// import { useDispatch } from "react-redux";

export const Detail = () => {
  const user = useSelector(state => state.user.value);

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});

  const [bigImage, setBigImage] = useState("");

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(0);

  const [avgrating, setavgRating] = useState(0);

  const [ratestar, setRateStar] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  const [similarProducts, setSimilarProducts] = useState([]);

  const [qty, setQty] = useState(1);

  // console.log(rating);

  const handleReview = e => {
    setLoading(true);
    e.preventDefault();
    http
      .post(`/products/${id}/reviews`, { comment, rating })
      .then(({ data }) => http.get(`/products/${id}`))
      .then(({ data }) => {
        setProduct(data);
        setComment("");
        setRating(0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // console.log(star);

  useEffect(() => {
    let total = 0;

    let stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    // console.log(product.reviews);

    if (product.reviews?.length > 0) {
      for (let review of product.reviews) {
        total = total + review.rating;
        stars[review.rating] += 1;
      }

      //calualting the percentage for each star rating

      for (let k in stars) {
        stars[k] = (stars[k] / product.reviews?.length) * 100;
      }
      setavgRating(total / product?.reviews.length);

      setRateStar(stars);
    } else {
      setavgRating(0);
    }
  }, [product]);

  useEffect(() => {
    setLoading(true);
    http
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setBigImage(data.images[0]);
        return http.get(`/products/${id}/similar`);
      })
      .then(({ data }) => setSimilarProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="col-12">
      <main class="row ">
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <div class="col-12 bg-white py-3 my-3">
              <div class="row">
                <div class="col-lg-5 col-md-12 mb-3">
                  <div class="col-12 mb-3">
                    <div
                      class="img-large border"
                      style={{ backgroundImage: `url('${imgURL(bigImage)}')` }}
                    ></div>
                    {/* <img src={imgURL(product.images[0])} alt="" srcset="" /> */}
                  </div>
                  <div class="col-12">
                    <div class="row">
                      {product?.images?.map((image, i) => (
                        <div class="col-sm-2 col-3">
                          <div
                            class="img-small border"
                            style={{
                              backgroundImage: `url('${imgURL(image)}')`,
                            }}
                            onMouseEnter={() => setBigImage(image)}
                            data-src="images/image-1.jpg"
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div class="col-lg-5 col-md-9">
                  <div class="col-12 product-name large">
                    {product?.name}
                    <small>
                      By <Link href="#">{product.brand?.name}</Link>
                    </small>
                  </div>
                  <div class="col-12 px-0">
                    <hr />
                  </div>
                  <div class="col-12">{product.summary}</div>
                </div>

                <div class="col-lg-2 col-md-3 text-center">
                  <div class="col-12 sidebar h-100">
                    <div class="row">
                      <div class="col-12">
                        <span class="detail-price">$2,500</span>
                        <span class="detail-price-old">$2,800</span>
                      </div>
                      <div class="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                        <div class="mb-3">
                          <label for="qty">Quantity</label>
                          <input
                            type="number"
                            id="qty"
                            min="1"
                            value={qty}
                            class="form-control"
                            onChange={({ target }) =>
                              setQty(parseInt(target.value))
                            }
                          />
                        </div>
                      </div>
                      <div class="col-12 mt-3">
                        <CartBtn product={product} quantity={qty} />
                      </div>
                      <div class="col-12 mt-3">
                        <button
                          class="btn btn-outline-secondary btn-sm"
                          type="button"
                        >
                          <i class="fas fa-heart me-2"></i>Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 mb-3 py-3 bg-white text-justify">
              <div class="row">
                <div class="col-md-7">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-12 text-uppercase">
                        <h2>
                          <u>Details</u>
                        </h2>
                      </div>
                      <div class="col-12" id="details">
                        {product.summary}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-5">
                  <div class="col-12 px-md-4 sidebar h-100">
                    <div class="row">
                      <div class="col-12 mt-md-0 mt-3 text-uppercase">
                        <h2>
                          <u>Ratings & Reviews</u>
                        </h2>
                      </div>
                      <div class="col-12">
                        <div class="row">
                          <div class="col-sm-4 text-center">
                            <div class="row">
                              <div class="col-12 average-rating">
                                {avgrating.toFixed(2)}
                              </div>
                              <div class="col-12">
                                of {product?.reviews?.length || 0} reviews
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <ul class="rating-list mt-3">
                              {[5, 4, 3, 2, 1].map((k, index) => (
                                <li key={index}>
                                  <div class="progress">
                                    <div
                                      class="progress-bar bg-dark"
                                      role="progressbar"
                                      style={{ width: ratestar[k] + "%" }}
                                      aria-valuenow={ratestar[k] + "%"}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    >
                                      {ratestar[k].toFixed(1) + "%"}
                                    </div>
                                  </div>
                                  <div class="rating-progress-label">
                                    {k}
                                    <i class="fas fa-star ms-1"></i>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 px-md-3 px-0">
                        <hr />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12">
                        <h4>Add Reviews</h4>
                      </div>
                      <div class="col-12">
                        <form>
                          <div class="mb-3">
                            <textarea
                              onChange={({ target }) =>
                                setComment(target.value)
                              }
                              class="form-control"
                              placeholder="Give your comment"
                              value={comment}
                            ></textarea>
                          </div>
                          <div class="mb-3">
                            <div class="d-flex ratings justify-content-end flex-row-reverse ">
                              <input
                                type="radio"
                                value="5"
                                id="rating-5"
                                checked={rating == 5}
                                onChange={() => setRating(5)}
                              />
                              <label htmlFor="rating-5"></label>

                              <input
                                type="radio"
                                value="4"
                                id="rating-4"
                                checked={rating == 4}
                                onChange={() => setRating(4)}
                              />
                              <label htmlFor="rating-4"></label>

                              <input
                                type="radio"
                                value="3"
                                id="rating-3"
                                checked={rating == 3}
                                onChange={() => setRating(3)}
                              />
                              <label htmlFor="rating-3"></label>

                              <input
                                type="radio"
                                value="2"
                                id="rating-2"
                                checked={rating == 2}
                                onChange={() => setRating(2)}
                              />
                              <label htmlFor="rating-2"></label>

                              <input
                                type="radio"
                                value="1"
                                id="rating-1"
                                checked={rating == 1}
                                onChange={() => setRating(1)}
                              />
                              <label htmlFor="rating-1"></label>
                            </div>
                          </div>
                          <div class="mb-3">
                            <button
                              class="btn btn-outline-dark"
                              onClick={handleReview}
                            >
                              Add Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 px-md-3 px-0">
                        <hr />
                      </div>
                    </div>

                    <div class="row ">
                      {/* {products} */}

                      {product?.reviews?.length > 0 ? (
                        product.reviews.map((review, index) => (
                          <div className="col-12">
                            <div class="col-12 text-justify py-2 px-3 mb-3">
                              <div class="row">
                                <div class="col-12">
                                  <strong class="me-2">{user?.name}</strong>
                                  <small>
                                    {[1, 2, 3, 4, 5].map(i => (
                                      <i
                                        className={`fa-${
                                          review.rating >= i
                                            ? "solid"
                                            : "regular"
                                        } fa-star`}
                                      ></i>
                                    ))}
                                  </small>
                                </div>
                                <div class="col-12">{review.comment}</div>
                                <div class="col-12">
                                  <small>
                                    <i class="fas fa-clock me-2"></i>
                                    {dtFormat(review.createdAt)}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h1>Data Not Found</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="row">
                <ProductSection
                  title="Similar products"
                  products={similarProducts}
                  loading={loading}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
