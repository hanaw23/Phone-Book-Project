import ReactDOM from "react-dom";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalProps } from "@/interface/modal.interface";

const Modal = (props: ModalProps) => {
  const { isOpen = false, close, title = "", content = null, showFooter = false, footer = false } = props;

  const closeIcon = (
    <FontAwesomeIcon
      icon={faClose}
      className={css`
        cursor: pointer;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        color: white;
        z-index: 50;
        width: 1rem;
        height: 1rem;
        background-color: transparent;
      `}
      onClick={() => {
        close();
      }}
    />
  );

  const modal = (
    <div>
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 10;
        `}
      >
        <div
          className={css`
            position: relative;
            width: 85%;
            margin: 50% auto 0;
            background-color: gray;
            border-radius: 0.5rem;
            padding: 1rem;
            z-index: 20;
          `}
        >
          {closeIcon}
          <div
            className={css`
              font-size: 20px;
              font-weight: bold;
              background-color: transparent;
              margin-bottom: 1rem;
            `}
          >
            {title}
          </div>
          <div
            className={css`
              margin-bottom: 1rem;
              background-color: transparent;
            `}
          >
            {content}
          </div>
          <div
            className={css`
              margin-bottom: 1rem;
              background-color: transparent;
            `}
          >
            {showFooter && footer}
          </div>
        </div>
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
