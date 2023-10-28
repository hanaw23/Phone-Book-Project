import { useRouter } from "next/navigation";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ListContact from "@/common/components/organisms/lists/listContact";

const Contacts = () => {
  const router = useRouter();

  //   === FUNCTIONS ===
  const redirectNewContact = () => {
    router.push("/contacts/new", { scroll: false });
  };

  // === HTML ===
  return (
    <>
      <ListContact />

      <div
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <div
          className={css`
            position: fixed;
            bottom: 1rem;
            background-color: transparent;
            margin-left: 1rem;
            margin-right: 1rem;
          `}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={css`
              color: white;
              background-color: #7caa2d;
              border-radius: 50%;
              padding: 1rem;
              width: 35px;
              height: 35px;
            `}
            onClick={redirectNewContact}
          />
        </div>
      </div>
    </>
  );
};

export default Contacts;
