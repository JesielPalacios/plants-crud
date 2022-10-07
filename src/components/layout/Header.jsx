import { Link } from 'react-router-dom'
import styled from 'styled-components'

export function Header() {
  return (
    <Container>
      <div>
        <span>
          <Link to="/plants">Warehouse Receipts</Link>
        </span>
      </div>
      <div></div>
    </Container>
  )
}

const Container = styled.header`
  /* background-color: aliceblue; */
  height: 50px;
  width: 100%;
  position: fixed;
  padding: 10px;

  display: flex;
  z-index: 1;

  div {
    flex: 1;
  }

  div:first-of-type {
    text-align: left;
    color: #0f1141;
  }

  border-bottom-color: rgba(60, 60, 60, 0.12);
  background-color: #f9f9f9;
  backdrop-filter: saturate(50%) blur(8px);
  transition: border-color 0.5s, background-color 0.5s;
  background: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`
