import React, { useCallback } from 'react';
import styled from 'styled-components';

import TaskRow from './TaskRow';

import { useManageTasks, useTasks } from '../../api/todo';

const FeedWrapper = styled.div`
  margin: 15px 0 60px;
`;

const DEFAULT_RESULTS = { results: [], total: 0 };

const TasksFeed = () => {
  const { data = DEFAULT_RESULTS, isLoading } = useTasks();
  const { results } = data;

  const { updateStatus } = useManageTasks();

  const onStatusUpdate = useCallback(
    (item) => {
      const status = item.status === 'pending' ? 'completed' : 'pending';
      updateStatus(item.id, status, item.todoId);
    },
    [updateStatus],
  );

  return (
    <FeedWrapper>
      {!isLoading &&
        results.map((task) => (
          <TaskRow
            key={`task:${task.id}`}
            task={task}
            onStatusUpdate={onStatusUpdate}
          />
        ))}
    </FeedWrapper>
  );
};

export default TasksFeed;
