import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import palette from '../../styles/palette';

const StyledInlineMessage = styled.div`
  margin: 8px 0;
  color: ${palette.monza};
  font-size: 14px;
`;

const InlineMessage = ({ children }) => {
  return <StyledInlineMessage>{children}</StyledInlineMessage>;
};

InlineMessage.propTypes = {
  children: PropTypes.string,
};

export default InlineMessage;
