import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";

import * as Yup from "yup";
import { TextBox, SubmitBtn } from "../../components";

import YupPassword from "yup-password";
import http from "../../http";
import { BackendvalidationError } from "../../library";
import { useEffect } from "react";

YupPassword(Yup);

export const Password = () => {
  useEffect(() => {
    document.title = "Password";
  }, []);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .minLowercase(1)
        .minSymbols(1)
        .minUppercase(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")], "Password must Match"),
    }),
    onSubmit: (data, { setSubmitting }) => {
      http
        .put("/profile/password", data)
        .then()
        .catch(({ response }) => {
          BackendvalidationError(formik, response);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Container className="bg-white shadow-sm py-3 my-3">
      <Col lg="4" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
        <Row>
          <Col>
            <h1>Change Password</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <TextBox
                label="Old Password"
                name="oldPassword"
                formik={formik}
                type="text"
              />
              <TextBox
                type="text"
                label="New Password"
                name="newPassword"
                formik={formik}
              />
              <TextBox
                type="text"
                label="Confirm Password"
                name="confirmPassword"
                formik={formik}
              />

              <SubmitBtn formik={formik} label="Save" icon="fa fa-edit" />
              {/* <SubmitBtn formik={formik} label="Add" icon="fa fa-plus" /> */}
            </Form>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
