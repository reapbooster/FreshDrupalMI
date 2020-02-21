import * as React from 'react';
import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';

interface KeywordFormProps {
  keywords?: string,
  handleSubmit: Function,
}

const KeywordForm: React.FunctionComponent<KeywordFormProps> = (props : KeywordFormProps) => (
  <>
    <Formik initialValues={props}
            onSubmit={props.handleSubmit}
            render={({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       isSubmitting,
                       /* and other goodies */
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
                { errors.keywords && touched.keywords}
              </form>
            )}
    >
    </Formik>
  </>
);

KeywordForm.defaultProps = {
  keywords: ""
}

export default KeywordForm;
