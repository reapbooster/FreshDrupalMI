import React from "react";
import { Field, Form, Formik } from "formik";

interface KeywordFormProps {
  keywords?: string;
  onSubmit;
}

const KeywordForm: React.FunctionComponent<KeywordFormProps> = (
  props: KeywordFormProps
) => {
  return (
    <>
      <Formik
        initialValues={{ keywords: props.keywords }}
        onSubmit={props.onSubmit}
        isInitialValid={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className="text-align-center">
            <Field
              id={"keywords"}
              name={"keywords"}
              type={"text"}
              placeholder={"Enter Keywords"}
              className={"text-align-center w-75 p-3"}
              onChange={handleChange}
              value={values.keywords}
              onBlur={handleBlur}
            />
            {errors.keywords && touched.keywords}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default KeywordForm;
