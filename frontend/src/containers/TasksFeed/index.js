import React, { useCallback } from 'react';
import styled from 'styled-components';

import TaskRow from './TaskRow';

import { useTasks } from '../../api/todo';

const FeedWrapper = styled.div`
  margin: 15px 0 60px;
`;

const DEFAULT_RESULTS = { results: [], total: 0 };

const TasksFeed = () => {
  const { data = DEFAULT_RESULTS, isLoading } = useTasks();
  const { results } = data;

  const onStatusUpdate = useCallback((item, type) => {
    if (type === 'task') {
      console.log(item);
    }

    if (type === 'subTask') {
      console.log(item);
    }
  }, []);

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
