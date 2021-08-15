import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ifProp } from 'styled-tools';

import palette from '../../styles/palette';

const StyledButton = styled.button`
  background: ${palette.sky};
  color: ${palette.white};
  border-radius: 4px;
  border: 1px solid ${palette.sky};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${palette.sunset};
    border-color: ${palette.sunset};
  }

  &:disabled {
    cursor: default;
    background: ${palette.clearsky};
    border-color: ${palette.clearsky};
    color: ${palette.clouds};
  }

  ${ifProp(
    { size: 'medium' },
    css`
      padding: 10px 30px;
    `,
  )}

  ${ifProp(
    { size: 'small' },
    css`
      padding: 5px 10px;
    `,
  )};
`;

const Button = ({ title, size, $margin, onClick, ...props }) => {
  return (
    <StyledButton size={size} $margin={$margin} onClick={onClick} {...props}>
      {title}
    </StyledButton>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
};

Button.defaultProps = {
  size: 'medium',
};

export default Button;
