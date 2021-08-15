import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckBox from '../../components/CheckBox';

import palette from '../../styles/palette';

const StyledRow = styled.div`
  padding: 10px 15px;
  border: 1px solid ${palette.clouds};
  margin-bottom: 5px;
  border-radius: 4px;
`;

const SubTaskRow = ({ subTask, onStatusUpdate }) => {
  return (
    <StyledRow>
      <CheckBox
        label={subTask.title}
        checked={subTask.status === 'completed'}
        id={`subtask_${subTask.id}`}
        onChange={onStatusUpdate.bind(null, subTask, 'subTask')}
      />
    </StyledRow>
  );
};

SubTaskRow.propTypes = {
  subTask: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'completed']),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  onStatusUpdate: PropTypes.func,
};

export default SubTaskRow;
