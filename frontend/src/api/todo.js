import fetch from 'cross-fetch';
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import cloneDeep from 'lodash/cloneDeep';

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

export const updateStatus = async (id, status, parentId) => {
  const typeParam = parentId ? 'sub-task' : 'todo';
  const res = await fetch(`${urls.apiUrl}/api/v1/${typeParam}/update/${id}`, {
    method: 'put',
    body: JSON.stringify({ status }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
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

  const onUpdateStatus = useCallback(
    (id, status, parentId, onComplete) => {
      const func = updateStatus(id, status, parentId);
      const onSuccess = (_, invalidator) => {
        const transaction = invalidator.mutate(Read.Tasks(), null, (data) => {
          if (!parentId) {
            const index = data.results.findIndex((item) => item.id === id);
            if (data.results[index]) {
              const clone = cloneDeep(data);
              clone.results[index].status = status;

              if (clone.results[index].Subtasks) {
                clone.results[index].Subtasks.forEach((_, subIndex) => {
                  clone.results[index].Subtasks[subIndex].status = status;
                });
              }
              return clone;
            }
          } else {
            const index = data.results.findIndex(
              (item) => item.id === parentId,
            );
            if (data.results[index]) {
              const clone = cloneDeep(data);
              if (clone.results[index].Subtasks) {
                const subTasks = clone.results[index].Subtasks;
                const subIndex = subTasks.findIndex((item) => item.id === id);

                if (subTasks[subIndex]) {
                  subTasks[subIndex].status = status;

                  const completedSubTasksCount = subTasks.reduce(
                    (acc, item) => (item.status === 'completed' ? 1 : 0) + acc,
                    0,
                  );

                  clone.results[index].status =
                    subTasks.length === completedSubTasksCount
                      ? 'completed'
                      : 'pending';
                }
              }
              return clone;
            }
          }
          return null;
        });
        transaction.commit();
      };
      mutate({
        mutationFn: func,
        onSuccess,
        onComplete,
      });
    },
    [mutate],
  );

  const onCreateTask = useCallback(
    (fields, onComplete) => {
      const func = createTask(fields);
      const onSuccess = (_, invalidator) => {
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
      updateStatus: onUpdateStatus,
      createTask: onCreateTask,
    }),
    [onUpdateStatus, onCreateTask],
  );
};
