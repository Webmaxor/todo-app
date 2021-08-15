import styled from 'styled-components';
import PropTypes from 'prop-types';
import { prop } from 'styled-tools';

const Paragraph = styled.p`
  text-align: ${prop('$textAlign', 'left')};
  margin-top: ${prop('$marginTop', '0')};
  margin-bottom: ${prop('$marginBottom', '8px')};
  font-size: ${prop('$fontSize', 'inherit')}
`;

Paragraph.propTypes = {
  $textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  $marginTop: PropTypes.string,
  $marginBottom: PropTypes.string,
};

export default Paragraph;
