import { useQuery } from "@apollo/client";
import { useEffect, useState, useRef, SetStateAction } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";

import Toast from "@/common/components/organisms/toast";
import InputComponent from "@/common/components/atoms/input";
import ButtonComponent from "@/common/components/atoms/button";
import InitialFirstLastName from "@/common/utils/initialName";

import { queryGetContactList } from "@/gql/graphql";
import { Contact } from "@/graphql/graphql";
import { SeverityToast } from "@/interface/toast.interface";

const ListContacts = () => {
  const router = useRouter();

  // === VARIABLES ===
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [contactListData, setContactListData] = useState<Contact[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const scrollContactRef = useRef<HTMLDivElement>(null);
  const [scrollElementVisible, setScrollElementVisible] = useState<boolean>(false);

  const [textSearch, setTextSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");

  const [isOpenToastFetchData, setIsOpenToastFetchData] = useState<boolean>(false);
  const [_, setToastsuccessFetchData] = useState<boolean>(false);

  // === GRAPHQL ===
  const { data, error } = useQuery(queryGetContactList, {
    variables: {
      limit: take,
      offset: debounce ? 0 : skip,
      where: {
        _or: [
          {
            first_name: {
              _ilike: `%${debounce}%`,
            },
          },
          {
            last_name: {
              _ilike: `%${debounce}%`,
            },
          },
        ],
      },
      order_by: [
        {
          first_name: "asc",
        },
      ],
    },
  });

  // === FUNCTIONS ===
  // onMounted
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(textSearch);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [textSearch]);

  useEffect(() => {
    if (!loadingData) {
      const observer = new IntersectionObserver((enteries) => {
        const entry = enteries[0];
        setScrollElementVisible(() => entry.isIntersecting);
      });

      if (scrollContactRef.current) observer.observe(scrollContactRef.current);
      if (scrollElementVisible && data.contact.length !== 0) {
        setSkip(skip + take);
      }
    }
  }, [scrollElementVisible, loadingData]);

  useEffect(() => {
    setLoadingData(true);
    if (error) {
      setToastsuccessFetchData(false);
      setIsOpenToastFetchData(true);
      setLoadingData(false);
    } else if (data) {
      setContactListData(debounce ? [...data.contact] : [...contactListData, ...data.contact]);

      if (debounce) setSkip(0);
      setLoadingData(false);
    }
  }, [data, error, skip, debounce]);

  const redirectToDetailContact = (contactId: number) => {
    router.push(`/contacts/${contactId}`);
  };

  return (
    <div>
      {/* Sticky Header */}
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
              margin-top: 0;
              margin-bottom: 3px;
            `}
          >
            Contacts
          </h1>
          <InputComponent
            label=""
            placeholder="Search..."
            componentClassName="width: 100%; background-color: transparent;"
            border="none"
            value={textSearch}
            iconPrefix={true}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setTextSearch(e.target.value as string)}
          />
        </div>
      </div>

      {/* List Contacs */}
      <div
        className={css`
          margin-top: 6rem;
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
              {InitialFirstLastName(contact.first_name, contact.last_name)}
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

        {/* Scroll Element intersection */}
        {!loadingData && <div ref={scrollContactRef} />}

        {/* Toast Handle Error Fetch Data */}
        <Toast isOpen={isOpenToastFetchData} summary={"Error"} detail={"Failed to fetch list contacts !"} severity={SeverityToast.ERROR} close={() => setIsOpenToastFetchData(false)} />
      </div>
    </div>
  );
};

export default ListContacts;
