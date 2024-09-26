

import { useEffect, useState , React} from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingComponent } from "../../components";
import http from "../../http";
import { dtFormat } from "../../library";

export const Order = () => {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);


  useEffect(() => {
    setLoading(true);

    http
      .get("/profile/orders")
      .then(({ data }) => setOrders(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return <Container>
  <Row>
    <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Row>
            <Col>
              <h1>Order List</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {orders.length > 0 ? (
                <Table bordered hover size="sm">
                  <thead className="table-dark">
                    <tr>
                      {/* <th>Order By Name</th>
                      <th>Order By Email</th> */}

                      {/* <th>Status</th> */}
                      <th>Details</th>
                      <th>Status</th>

                      <th>Created at</th>
                      <th>Updated at</th>

             
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr>
                        {/* <td>{order.user?.name}</td>
                        <td>{order.user?.email}</td> */}
                        {/* <td>{order.status}</td> */}
                        {/* <td>
                          {order.details.map(
                            (detail) => detail?.product?.name
                          )}
                        </td>
                        <td>
                          {order.details.map(
                            (detail) => detail.qty * detail.price
                          )}
                        </td> */}
                        <td>
                          <ul>
                            {order.details.map((detail) => (
                              <li key={detail._id}>
                                {detail.qty} x {detail.product?.name}
                                @Rs {detail.price} = Rs . {detail.total}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          {order.status}
                        </td>

                        <td>{dtFormat(order.createdAt)}</td>
                        <td>{dtFormat(order.updatedAt)}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h4 className="text-muted">No orders</h4>
              )}
            </Col>
          </Row>
          </>
        
      )}
    </Col>
  </Row>
</Container>
};
