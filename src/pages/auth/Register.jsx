import { Col, Container, Row, Form } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

import http from "../../http";
import { BackendvalidationError } from "../../library";
import { useEffect,  } from "react";

import { useNavigate } from "react-router-dom";

import {  InputTextField,  SubmitBtn } from "../../components";

import YupPassword from "yup-password";

YupPassword(Yup);
export const Register = () => {


  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  // console.log(remember);

  // console.log("hello");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Must match with Password"),
      phone: Yup.string().required().minNumbers(10),
      address: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      // console.log("Hello");

      console.log(data);

      //   setTimeout(() => setSubmitting(false), 2000);
      // console.log(setSubmitting);
      //api request
      // https://mern-130.nru.com.np/ is common route in all so make it in other file and call it
      // console.log(response);

      http
        .post("/auth/register", data)
        .then(({ data }) => navigate("/login"))
        .catch(({ response }) => {
          console.log(response);
          
          BackendvalidationError(formik, response);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <>
  
      <Container className="bg-white">
          <Row>
            <Col
              lg="4"
              className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
            >
              <Row>
                <Col className="text-center">
                  <h1>Register</h1>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <InputTextField
                      label="Name"
                      name="name"
                      formik={formik}
                      type="text"
                    />
                    <InputTextField
                      type="text"
                      label="Email"
                      name="email"
                      formik={formik}
                    />
                    <InputTextField
                      type="password"
                      label="Password"
                      name="password"
                      formik={formik}
                    />
                    <InputTextField
                      type="password"
                      label="ConfirmPassword"
                      name="confirmPassword"
                      formik={formik}
                    />
                    <InputTextField
                      type="text"
                      label="Phoneno"
                      name="phone"
                      formik={formik}
                    />
                    <InputTextField
                      type="text"
                      label="Address"
                      name="address"
                      formik={formik}
                    />

                    <div className="d-grid">
                      <SubmitBtn
                        formik={formik}
                        label="Register"
                        icon="fa fa-user-plus"
                      />
                    </div>
                    {/* <SubmitBtn formik={formik} label="Add" icon="fa fa-plus" /> */}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>


     
    </>
  );
};
