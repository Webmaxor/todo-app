import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { useManageTasks } from '../../api/todo';

const FormWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  .input-wrapper {
    flex: 0 1 80%;
    margin-right: 10px;
  }

  button {
    flex: 0 1 20%;
  }
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Task description is required'),
});

const initialValues = {
  title: '',
};

const TaskForm = () => {
  const { createTask } = useManageTasks();

  const handleSave = useCallback(
    (values, { setSubmitting, resetForm }) => {
      createTask(values, () => {
        setSubmitting(false);
        resetForm();
      });
    },
    [createTask],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSave}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormWrapper>
            <TextField
              placeholder="What to do?"
              type="text"
              maxLength={60}
              name="title"
            />
            <Button type="submit" title="New List" disabled={isSubmitting} />
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
