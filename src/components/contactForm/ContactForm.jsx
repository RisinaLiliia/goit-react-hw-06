import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import css from "./ContactForm.module.css";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .required("This field is required"),
  number: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Invalid phone number")
    .required("This field is required"),
});

export default function ContactForm({ onAdd }) {
  const handleSubmit = (values, actions) => {
    const newContact = {
      id: uuidv4(),
      name: values.name,
      number: values.number,
    };
    onAdd(newContact);
    actions.resetForm();
    document.getElementById("name").focus();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.group}>
          <label className={css.label} htmlFor="name">
            Name:
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id="name"
            aria-label="Enter the name of the contact"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.group}>
          <label className={css.label} htmlFor="number">
            Number:
          </label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            id="number"
            aria-label="Enter the phone number of the contact"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
