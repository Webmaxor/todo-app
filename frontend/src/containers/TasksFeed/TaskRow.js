import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckBox from '../../components/CheckBox';
import SubTaskRow from './SubTaskRow';

import palette from '../../styles/palette';

const StyledRow = styled.div`
  .task-wrapper {
    padding: 10px 15px;
    background: ${palette.chiffon};
    margin-bottom: 5px;
    border-radius: 4px;
  }

  .sub-tasks {
    margin-left: 30px;
  }
`;

const TaskRow = ({ task, onStatusUpdate }) => {
  const subTasks = task.Subtasks;

  return (
    <StyledRow>
      <div className="task-wrapper">
        <CheckBox
          label={task.title}
          checked={task.status === 'completed'}
          id={`task_${task.id}`}
          onChange={onStatusUpdate.bind(null, task, 'task')}
        />
      </div>
      <div className="sub-tasks">
        {subTasks.length > 0 &&
          subTasks.map((subTask) => (
            <SubTaskRow
              key={`subTask:${subTask.id}`}
              subTask={subTask}
              onStatusUpdate={onStatusUpdate}
            />
          ))}
      </div>
    </StyledRow>
  );
};

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'completed']),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    SubTasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        status: PropTypes.oneOf(['pending', 'completed']),
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }),
    ),
  }),
  onStatusUpdate: PropTypes.func,
};

export default TaskRow;
