import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }} //, passwordConfirm: ""
      onSubmit={async values => {
        console.log(JSON.stringify(values, null, 2));
        //await new Promise(resolve => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
        fetch("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          method: "post",
          body: JSON.stringify(values, null, 2)
        })
          .then(function(response) {
            console.log("response", response);
            return response.json();
          })
          .then(function(data) {
            console.log("Created Gist:", data.html_url);
          });
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Required"),
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string().required("Required"),
        passwordConfirm: Yup.string().required("Required")
      })}
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" style={{ display: "block" }}>
              Pseudo
            </label>
            <input
              id="username"
              placeholder="Enter your pseudo"
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.username && touched.username ? "text-input error" : "text-input"}
            />
            {errors.username && touched.username && <div className="input-feedback">{errors.username}</div>}

            <label htmlFor="email" style={{ display: "block" }}>
              Adresse email
            </label>
            <input
              id="email"
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
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "text-input error" : "text-input"}
            />
            {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}

            {/* <label htmlFor="passwordConfirm" style={{ display: "block" }}>
              Confirmer le mot de passe
            </label>
            <input
              id="passwordConfirm"
              placeholder="Enter your password again"
              type="password"
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.passwordConfirm && touched.passwordConfirm ? "text-input error" : "text-input"}
            />
            {errors.passwordConfirm && touched.passwordConfirm && (
              <div className="input-feedback">{errors.passwordConfirm}</div>
            )} */}

            <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Créer mon compte personnel
            </button>

            {/* <DisplayFormikState {...props} /> */}
          </form>
        );
      }}
    </Formik>
  );
};

export default Signup;
