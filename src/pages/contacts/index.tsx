import { useRouter } from "next/navigation";
import { useState } from "react";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ListContact from "@/common/components/organisms/lists/listContact";
import InputComponent from "@/common/components/atoms/input";

const Contacts = () => {
  const router = useRouter();

  // === VARIABLES ===
  const [firstNameSearch, setFirstNameSearch] = useState("");

  //   === FUNCTIONS ===
  const redirectNewContact = () => {
    router.push("/contacts/new", { scroll: false });
  };

  const handleSearch = () => {
    setFirstNameSearch(firstNameSearch);
    alert(firstNameSearch);
  };

  //   === HTML ===
  return (
    <>
      <div
        className={css`
          position: fixed;
          top: 0;
          width: 100%;
          background-color: #4c4a4a;
        `}
      >
        <div
          className={css`
            margin-top: 10px;
            margin-bottom: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;
            gap: 10px;
            background-color: transparent;
          `}
        >
          <h1
            className={css`
              background-color: transparent;
            `}
          >
            Contacts
          </h1>
          <InputComponent label="" placeholder="Search..." componentClassName="width: 100%; background-color: transparent;" border="none" value={firstNameSearch} iconPrefix={true} onChange={handleSearch} />
        </div>
      </div>

      <div
        className={css`
          margin-top: 6rem;
        `}
      >
        <ListContact />
      </div>

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
              width: 2rem;
              height: 2rem;
            `}
            onClick={redirectNewContact}
          />
        </div>
      </div>
    </>
  );
};

export default Contacts;
