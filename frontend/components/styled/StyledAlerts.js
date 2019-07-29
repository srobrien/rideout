import styled from 'styled-components';

export const AlertStyles = styled.div`
  padding: 0.5rem;
  background: white;
  margin: 0 auto;
  border: 1px solid ${props => props.border};
  background-color: ${props => props.bg};
  width: ${props => props.width};
  color: ${props => props.text};
  margin-bottom: ${props => props.mb};
  text-align: center;

  p {
    margin: 0;
    font-weight: 100;
    font-size: 0.85rem;
  }
`;

AlertStyles.defaultProps = {
  width: '100%',
  mb: '30px',
};
