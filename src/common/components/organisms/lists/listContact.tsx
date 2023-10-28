import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";

import Toast from "@/common/components/organisms/toast";

import { queryGetContactList } from "@/gql/graphql";
import { Contact } from "@/graphql/graphql";
import { SeverityToast } from "@/interface/toast.interface";

const ListContacts = () => {
  const router = useRouter();

  // === GRAPHQL ===
  const { data, error } = useQuery(queryGetContactList);

  // === VARIABLES ===
  const [take, setTake] = useState(100);
  const [skip, setSkip] = useState(0);
  const [contactListData, setContactListData] = useState<Contact[]>([]);

  const [isOpenToastFetchData, setIsOpenToastFetchData] = useState(false);
  const [_, setToastsuccessFetchData] = useState(false);

  //   === FUNCTIONS ===
  // onMounted
  useEffect(() => {
    if (error) {
      setToastsuccessFetchData(false);
      setIsOpenToastFetchData(true);
    } else if (data) {
      setContactListData([...data.contact]);
    }
  }, [data, error]);

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
      {contactListData.map((contact, index) => (
        <div
          key={index}
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

      {/* Toast Handle Error Fetch Data */}
      <Toast isOpen={isOpenToastFetchData} summary={"Error"} detail={"Failed to delete contact !"} severity={SeverityToast.ERROR} close={() => setIsOpenToastFetchData(false)} />
    </div>
  );
};

export default ListContacts;
