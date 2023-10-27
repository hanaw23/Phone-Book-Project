import { css } from "@emotion/css";
import ButtonComponent from "@/common/components/atoms/button";

const DeleteConfirmation = (props: { close: () => void; submitDelete: () => void; message: string }) => {
  return (
    <div
      className={css`
        background-color: transparent;
      `}
    >
      <p
        className={css`
          text-align: center;
          font-size: 15px;
          background-color: transparent;
          margin-bottom: 1.5rem;
        `}
      >
        {props.message}
      </p>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: 0.5rem;
          background-color: transparent;
        `}
      >
        <ButtonComponent label="No" type="button" color="#BFBFBF" fontWeight="bold" backgroundColor="white" borderRadius="5px" padding="10px 20px" onClick={props.close} />
        <ButtonComponent label="Yes" type="button" color="white" fontWeight="bold" backgroundColor="#7caa2d" borderRadius="5px" padding="10px 20px" onClick={props.submitDelete} />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
