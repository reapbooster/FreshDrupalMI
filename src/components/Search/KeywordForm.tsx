import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';

const KeywordForm = () => {

  const formik = useFormik({
    initialValues: {
      keywords: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Control
        id={"keywords"}
        name={"keywords"}
        type={"text"}
        size="lg"
        placeholder={"Enter Keywords"}
        className={"text-align-center"}
        onChange={formik.handleChange}
        value={formik.values.keywords}/>
    </Form>
  )
}

export default KeywordForm;
