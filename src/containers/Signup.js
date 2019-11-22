import React from "react";
import { useField, Formik, Form } from "formik";
import axios from "axios";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

const Signup = () => {
  // const [username] = React.useState(null);
  // const [email] = React.useState(null);
  // const [password] = React.useState(null);
  // {props => {
  //     const {
  //       values,
  //       touched,
  //       errors,
  //       dirty,
  //       isSubmitting,
  //       handleChange,
  //       handleBlur,
  //       handleSubmit,
  //       handleReset
  //     } = props;
  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ username: "", email: "toto@toto.fr", password: "" }}
        onSubmit={(values, actions, event) => {
          // console.log("[Signup] in Formik's onSubmit", values);
          // alert(JSON.stringify(values, null, 2));
          // console.log(values.username, values.email, values.password);
          // fetch("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          //   method: "post",
          //   // mode: "no-cors",
          //   //body: JSON.stringify(values, null, 2)
          //   username: values.username,
          //   email: values.email,
          //   password: values.password
          // })
          //   .then(function(response) {
          //     console.log("response", response);
          //     return response.text();
          //   })
          //   .then(function(data) {
          //     console.log("Created Gist:", data.html_url);
          //   });
          axios
            .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
              username: values.username,
              email: values.email,
              password: values.password
            })
            .then(response => {
              console.log(response.data);
              // if (response.data && response.data.token) {
              //   this.props.logIn({
              //     token: response.data.token,
              //     username: response.data.account.username,
              //     _id: response.data._id
              //   });

              //   this.props.history.push("/");
              // }
            })
            .catch(err => {
              console.log(err);
            });
          event.preventDefault();
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <MyTextField name="username" type="text" label="User name" />
            <MyTextField name="email" type="text" label="Email" />
            <MyTextField name="password" type="password" label="Mot de passe" />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};

export default Signup;
