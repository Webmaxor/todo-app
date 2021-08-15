import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { useManageTasks } from '../../api/todo';

const FormWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

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

const SubTaskForm = ({ todoId }) => {
  const { createSubTask } = useManageTasks();

  const handleSave = useCallback(
    (values, { setSubmitting, resetForm }) => {
      createSubTask({ ...values, todo_id: todoId }, () => {
        setSubmitting(false);
        resetForm();
      });
    },
    [createSubTask, todoId],
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
              placeholder="What are the steps?"
              type="text"
              maxLength={60}
              name="title"
            />
            <Button type="submit" title="New Step" disabled={isSubmitting} />
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

SubTaskForm.propTypes = {
  todoId: PropTypes.number,
};

export default SubTaskForm;
