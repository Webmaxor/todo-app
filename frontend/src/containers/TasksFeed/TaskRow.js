import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckBox from '../../components/CheckBox';
import SubTaskRow from './SubTaskRow';

import palette from '../../styles/palette';
import Paragraph from '../../components/Paragraph';

const StyledRow = styled.div`
  .task-wrapper {
    padding: 10px 15px;
    background: ${palette.chiffon};
    margin-bottom: 5px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;

    p {
      width: 135px;
      cursor: pointer;
    }
  }

  .sub-tasks {
    margin-left: 30px;
  }
`;

const Arrow = styled.span`
  display: inline-block;
  border-bottom: 1px solid ${palette.dusty};
  border-right: 1px solid #9b9b9b;
  width: 8px;
  height: 8px;
  transform: rotate(-45deg);

  &.open {
    transform: rotate(45deg);
    margin-bottom: 3px;
  }
`;

const TaskRow = ({ task, onStatusUpdate }) => {
  const subTasks = task.Subtasks;
  const subTasksCount = subTasks.length;
  const completedSubTasksCount = useMemo(
    () =>
      subTasks.reduce(
        (acc, item) => (item.status === 'completed' ? 1 : 0) + acc,
        0,
      ),
    [subTasks],
  );

  const [isOpen, setAccordionOpen] = useState(
    subTasksCount !== completedSubTasksCount,
  );

  const accordionToggler = useCallback(
    () => setAccordionOpen(!isOpen),
    [isOpen],
  );

  return (
    <StyledRow>
      <div className="task-wrapper">
        <CheckBox
          label={task.title}
          checked={task.status === 'completed'}
          id={`task_${task.id}`}
          onChange={onStatusUpdate.bind(null, task)}
        />

        {subTasksCount > 0 && (
          <Paragraph
            $color={palette.dusty}
            $fontSize="14px"
            $marginTop="4px"
            $marginBottom="0"
            onClick={accordionToggler}
          >
            {completedSubTasksCount} of {subTasksCount} completed &nbsp;
            <Arrow
              onClick={accordionToggler}
              className={isOpen ? 'open' : ''}
            />
          </Paragraph>
        )}
      </div>

      {isOpen && subTasksCount > 0 && (
        <div className="sub-tasks">
          {subTasks.map((subTask) => (
            <SubTaskRow
              key={`subTask:${subTask.id}`}
              subTask={subTask}
              onStatusUpdate={onStatusUpdate}
            />
          ))}
        </div>
      )}
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
