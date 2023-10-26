import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";

import { useGetContactList } from "../../../../../lib/service/contact.store";
import { ContactPhoneNumber } from "../../../../../lib/interface/phoneNumber";

const ListContacts = () => {
  const router = useRouter();

  // === VARIABLES ===
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [contactListData, setContactListData] = useState([] as ContactPhoneNumber[]);

  //   === FUNCTIONS ===
  const fetchContactList = useGetContactList(take, skip);

  // onMounted
  useEffect(() => {
    if (fetchContactList.error) {
      alert(fetchContactList.error);
    } else if (fetchContactList.data) {
      setContactListData(fetchContactList.data.contact);
    }
  }, [fetchContactList]);

  const getInitialFirstLastName = (firstName: string, lastName: string) => {
    return [firstName[0], lastName[0]].join("").toUpperCase();
  };
  const redirectToDetailContact = (contactId: number) => {
    router.push(`/contacts/${contactId}`);
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
