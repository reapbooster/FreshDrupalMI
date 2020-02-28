import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';

interface KeywordFormProps {
  keywords?: string,
  onSubmit;
}

const KeywordForm: React.FunctionComponent<KeywordFormProps> = (props : KeywordFormProps) => {
  return (
    <>
      <Formik
        initialValues={{ "keywords": props.keywords }}
        onSubmit={props.onSubmit}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
          <form
            onSubmit={handleSubmit}
            className="text-align-center"
          >
            <Field
              id={"keywords"}
              name={"keywords"}
              type={"text"}
              placeholder={"Enter Keywords"}
              className={"text-align-center w-75 p-3"}
              values={values.keywords}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { errors.keywords && touched.keywords }
          </form>
        )}
      </Formik>
    </>
  )

};

KeywordForm.defaultProps = {
  keywords: ""
}

export default KeywordForm;
