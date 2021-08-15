import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import palette from '../../styles/palette';
import InlineMessage from '../InlineMessage';

const InputWrapper = styled.div``;

const StyledTextField = styled.input`
  border: ${palette.silver} 1px solid;
  border-radius: 4px;
  display: block;
  padding: 10px 15px;
  font-size: 16px;
  width: calc(100% - 30px);
  outline: none;

  ::placeholder {
    color: ${palette.silver};
  }
`;

const TextField = ({ type, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <InputWrapper className="input-wrapper">
      <StyledTextField type={type} {...field} {...props} />
      {meta.touched && meta.error && (
        <InlineMessage>{meta.error}</InlineMessage>
      )}
    </InputWrapper>
  );
};

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
};

TextField.defaultProps = {
  type: 'text',
};

export default TextField;
