import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';

import palette from '../../styles/palette';

const StyledCheckBox = styled.div`
  position: relative;
  min-height: 24px;
  line-height: 1;

  input {
    position: absolute;
    left: 0;
    top: 0;
    visibility: hidden;

    + label {
      line-height: 24px;
      position: relative;
      cursor: pointer;
      margin-top: 0;
      margin-bottom: 0;
      transition: none;
      display: inline-block;

      ${switchProp('$size', {
        small: css`
          padding-left: 22px;
          font-size: 14px;
        `,
        medium: css`
          padding-left: 27px;
          font-size: 16px;
        `,
      })}

      &::before {
        transition: none;
        content: '';
        border: 2px solid ${palette.clearsky};
        display: block;
        border-radius: 3px;
        background: ${palette.white};
        margin-right: 4px;
        position: absolute;
        left: 0px;

        ${switchProp('$size', {
          small: css`
            width: 12px;
            height: 12px;
            top: 4px;
          `,
          medium: css`
            width: 14px;
            height: 14px;
            top: 3px;
          `,
        })}
      }

      &::after {
        content: '';
        width: 10px;
        height: 4px;
        position: absolute;
        left: 2px;
        top: 8px;
        border: none;
        border-bottom: 2px solid ${palette.white};
        border-left: 2px solid ${palette.white};
        transform: rotate(-45deg);
        display: none;
        margin-right: 4px;

        ${switchProp('$size', {
          small: css`
            left: 2px;
          `,
          medium: css`
            left: 3px;
          `,
        })}
      }
    }

    &:checked + label {
      &::before {
        background: ${palette.clearsky};
      }

      &::after {
        display: block;
      }
    }
  }
`;

const CheckBox = ({ $size, label, id, checked, onChange, className }) => {
  return (
    <StyledCheckBox $size={$size} className={className}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </StyledCheckBox>
  );
};

CheckBox.defaultProps = {
  $size: 'medium',
};

CheckBox.propTypes = {
  $size: PropTypes.oneOf(['small', 'medium']),
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default CheckBox;
