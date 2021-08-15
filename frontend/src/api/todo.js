import fetch from 'cross-fetch';
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';

import useQueryInvalidator from '../hooks/useQueryInvalidator';
import urls from '../config/urls';
import Read from './keys';

export const getTasks = async () => {
  const res = await fetch(`${urls.apiUrl}/api/v1/todo/index`);
  return res.json();
};

export const useTasks = () => {
  return useQuery(Read.Tasks(), getTasks);
};

export const createTask = async (fields) => {
  const res = await fetch(`${urls.apiUrl}/api/v1/todo/create`, {
    method: 'post',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const useManageTasks = () => {
  const mutationFn = ({ mutationFn }) => mutationFn;
  const invalidator = useQueryInvalidator();
  const { mutate } = useMutation(mutationFn, {
    onMutate: ({ onMutate }) => {
      if (onMutate) {
        return onMutate(invalidator);
      }
      return {};
    },
    onSettled: (
      data,
      error,
      { onComplete, onError, onSuccess },
      { transaction },
    ) => {
      if (data && !error && onSuccess) {
        onSuccess(data, invalidator);
      }
      if (error && onError) {
        onError(error);
      }
      if (error && transaction) {
        transaction.rollback();
      }
      if (onComplete) {
        onComplete(data, error);
      }
    },
  });

  const onCreateTask = useCallback(
    (fields, onComplete) => {
      const func = createTask(fields);
      const onSuccess = (data, invalidator) => {
        invalidator.reset(Read.Tasks(), null);
      };
      mutate({
        mutationFn: func,
        onSuccess,
        onComplete,
      });
    },
    [mutate],
  );

  return useMemo(
    () => ({
      createTask: onCreateTask,
    }),
    [onCreateTask],
  );
};
