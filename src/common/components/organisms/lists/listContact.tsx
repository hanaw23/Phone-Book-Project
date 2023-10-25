import { css } from "@emotion/css";
import { useRouter } from "next/navigation";

import { contactListData } from "../../../lib/data/contactData";

const ListContacts = () => {
  const router = useRouter();

  //   === FUNCTIONS ===
  const getInitialFirstLastName = (firstName: string, lastName: string) => {
    return [firstName[0], lastName[0]].join("").toUpperCase();
  };

  const redirectToDetailContact = (contactId: number) => {
    router.push(`/contacts/${contactId}`, { scroll: false });
  };

  return (
    <div
      className={css`
        overflow-y: auto;
      `}
    >
      {contactListData.map((contact) => (
        <div
          key={contact.id}
          className={css`
            display: flex;
            gap: 1rem;
            margin-bottom: 4px;
            width: 100%;
            border-bottom: 1px solid #bfbfbf;
            padding: 1rem;
            cursor: pointer;
          `}
          onClick={() => redirectToDetailContact(contact.id)}
        >
          <div
            className={css`
              border: 1px solid #bfbfbf;
              border-radius: 50%;
              width: 2.5rem;
              height: 2.5rem;
              text-align: center;
              line-height: 2.2rem;
            `}
          >
            {getInitialFirstLastName(contact.first_name, contact.last_name)}
          </div>
          <p
            className={css`
              line-height: 2.2rem;
            `}
          >
            {contact.first_name} {contact.last_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListContacts;
