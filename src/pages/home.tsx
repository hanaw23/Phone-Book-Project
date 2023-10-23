import { css } from "@emotion/css";
import styled from "@emotion/styled";

const color = "white";

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

export default function Home() {
  return (
    <>
      <div
        className={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        <div>Halo</div>
      </div>

      <Button>This my button component.</Button>
    </>
  );
}
