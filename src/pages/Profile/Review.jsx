import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import http from "../../http";
import { LoadingComponent } from "../../components";

import { dtFormat } from "../../library";

const List = () => {
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);

  //   const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    http
      .get("/profile/reviews")
      .then(({ data }) => setReviews(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);


  return (
    <div>
      <Container>
        <Row>
          <Col
            xs="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col>
                    <h1>Review List</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {reviews.length > 0 ? (
                      <Table bordered hover size="sm">
                        <thead className="table-dark">
                          <tr>
                         
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Product</th>
                            <th>Created At</th>

                            <th>Updated At</th>

                     
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.map((review, index) => (
                            <tr>
                            

                              <td>{review.comment}</td>

                              <td>{review.rating}</td>

                              <td>{review.product?.name}</td>

                              <td>{dtFormat(review.createdAt)}</td>
                              <td>{dtFormat(review.updatedAt)}</td>
                            
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <h4 className="text-muted">No reviews</h4>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;

