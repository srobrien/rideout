import styled from 'styled-components';

export const PaginationContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;

  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;

    border-right: 1px solid lightgray;
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
  a[aria-disabled='false'] {
    color: #4a89dc;
  }
  a[aria-disabled='false']:hover {
    color: #224777;
  }
`;

export const PageText = styled.div``;

export const PaginationButton = styled.div`
  padding-top: 25px;
`;
