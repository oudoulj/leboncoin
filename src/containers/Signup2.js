import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Signup2 = props => {
  //({history,logIn})
  console.log("props in Signup2", props); //includes props related to Route (history, location, match...) , user and logIn
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }} //, passwordConfirm: ""
      onSubmit={async values => {
        console.log("in Formik's onSubmit", values);
        console.log(JSON.stringify(values, null, 2));
        //await new Promise(resolve => setTimeout(resolve, 500));
        //alert(JSON.stringify(values, null, 2));
        const response = await fetch("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          method: "post",
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
          // username: values.username,
          // email: values.email,
          // password: values.password
        });
        const myJson = await response.json();
        console.log("myJson", JSON.stringify(myJson));
        if (myJson && myJson.token) {
          //set token here
          props.logIn({
            token: myJson.token,
            username: myJson.account.username,
            _id: myJson._id
          });
          props.history.push("/");
        }
        // .then(response => {
        //   console.log("response.data", response.data);
        //   console.log("response.json()", response.json());
        //   if (response.data && response.data.token) {
        //     console.log("response.data.token", response.data.token);
        //     // this.props.logIn({
        //     //   token: response.data.token,
        //     //   username: response.data.account.username,
        //     //   _id: response.data._id
        //     // });

        //     // this.props.history.push("/");
        //   }
        // })
        // .catch(err => {
        //   console.log("Axios error", err);
        // });
        // .then(function(data) {
        //   console.log("Created Gist:", data.html_url);
        // });
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Required"),
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string().required("Required")
        //passwordConfirm: Yup.string().required("Required")
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
          <Form onSubmit={handleSubmit}>
            <label htmlFor="username" style={{ display: "block" }}>
              Pseudo
            </label>
            <Field
              name="username"
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
            <button type="submit" disabled={isSubmitting} onClick={() => console.log("just clicked submit")}>
              Créer mon compte personnel
            </button>

            {/* <DisplayFormikState {...props} /> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Signup2;
