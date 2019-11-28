import React from "react";
import { Formik, Form, Field } from "formik";

const SignIn = props => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async values => {
        console.log("Trying to connect...");
        const response = await fetch("https://leboncoin-api.herokuapp.com/api/user/log_in", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        const myJson = await response.json();
        console.log("myJson Signin", JSON.stringify(myJson));
        if (myJson && myJson.token) {
          //set token here
          props.logIn({
            token: myJson.token,
            username: myJson.account.username,
            _id: myJson._id
          });
          props.history.push("/");
        }
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ display: "block" }}>
              Pseudo
            </label>
            <Field
              name="email"
              placeholder="Enter your email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "text-input error" : "text-input"}
            />
            {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

            <label htmlFor="password" style={{ display: "block" }}>
              Mot de passe
            </label>
            <Field
              name="password"
              placeholder="Enter your password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "text-input error" : "text-input"}
            />
            {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}

            <button type="submit">Connecte moi!</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignIn;
