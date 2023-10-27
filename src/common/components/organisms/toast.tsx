import ReactDOM from "react-dom";
import { useEffect } from "react";
import { css } from "@emotion/css";
import { ToastProps, SeverityToast } from "@/interface/toast.interface";

const Toast = (props: ToastProps) => {
  const { isOpen = false, summary = "", detail = "", severity = SeverityToast, close } = props;

  // === FUNCTIONS ===
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [close, isOpen]);

  const toast = (
    <div>
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
          z-index: 10;
        `}
      >
        <div
          className={css`
            position: relative;
            width: 60%;
            height: 10%;
            margin: 0 0 0 40%;
            background-color: ${severity === SeverityToast.SUCCESS ? "#7caa2d" : severity === SeverityToast.ERROR ? "red" : severity === SeverityToast.WARN ? "#F48817" : "#3A84F4"};
            border-radius: 2px;
            padding: 10px;
            z-index: 20;
          `}
        >
          <div
            className={css`
              font-size: 15px;
              font-weight: bold;
              background-color: transparent;
              margin-bottom: 4px;
            `}
          >
            {summary}
          </div>
          <div
            className={css`
              margin-top: 4px;
              font-size: 13px;
              background-color: transparent;
            `}
          >
            {detail}
          </div>
        </div>
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(toast, document.body) : null;
};

export default Toast;
