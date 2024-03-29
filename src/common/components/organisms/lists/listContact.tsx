import { useQuery } from "@apollo/client";
import { useEffect, useState, SetStateAction, useCallback } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Toast from "@/common/components/organisms/toast";
import InputComponent from "@/common/components/atoms/input";
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

  const [scrollYView, setScrollYView] = useState<number>(250);

  const [contactFavoriteList, setContactFavoriteList] = useState<Contact[]>([]);
  const [hideFavoriteList, setHideFavoriteList] = useState<boolean>(false);

  const [textSearch, setTextSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");
  const [tempDataSearch, setTempDataSearch] = useState<Contact[]>([]);

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
  const filterContactListByFavorite = () => {
    for (const contact of contactListData) {
      const findContactById = contactFavoriteList.find((contactFavorite: Contact) => contactFavorite.id === contact.id);
      if (findContactById) {
        setContactListData((prev) => prev.filter((contact) => contact.id !== findContactById.id));
      }
    }
  };

  // onMounted
  useEffect(() => {
    const dataContactFavorite = window.localStorage.getItem("CONTACT_FAVORITE_LIST");
    if (dataContactFavorite) {
      setContactFavoriteList([...JSON.parse(dataContactFavorite as string)]);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(textSearch);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [textSearch]);

  const scrollView = useCallback(() => {
    if (window.scrollY > scrollYView) {
      setSkip(skip + take);
      setScrollYView(scrollYView + 250);
    }
  }, []);

  useEffect(() => {
    return () => {
      window.addEventListener("scroll", scrollView);
    };
  }, [scrollView]);

  useEffect(() => {
    setLoadingData(true);
    if (error) {
      setToastsuccessFetchData(false);
      setIsOpenToastFetchData(true);
    } else if (data) {
      setContactListData(contactListData.length === 0 ? [...data.contact] : [...contactListData, ...data.contact]);

      if (debounce) {
        setTempDataSearch([...data.contact]);
        setContactListData([...data.contact]);
        setSkip(0);
        setHideFavoriteList(true);
      } else {
        if (tempDataSearch.length > 0) {
          setContactListData([...data.contact]);
        }
        setHideFavoriteList(false);
        setTempDataSearch([]);
      }

      if (contactFavoriteList.length > 0) {
        filterContactListByFavorite();
      }
    }
    setLoadingData(false);
  }, [data, error, debounce, contactFavoriteList, skip]);

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

      {/* List Favorite Contacts */}
      {contactFavoriteList.length > 0 && !hideFavoriteList && (
        <div
          className={css`
            margin-top: 6.5rem;
          `}
        >
          {contactFavoriteList.map((favorite) => (
            <div
              key={favorite.id}
              className={css`
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                width: 100%;
                border-bottom: 1px solid #bfbfbf;
                padding: 1rem;
                cursor: pointer;
              `}
              onClick={() => redirectToDetailContact(favorite.id)}
            >
              <div
                className={css`
                  display: flex;
                  gap: 1rem;
                  margin-bottom: 4px;
                `}
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
                  {InitialFirstLastName(favorite.first_name as string, favorite.last_name as string)}
                </div>
                <p
                  className={css`
                    line-height: 2.2rem;
                  `}
                >
                  {favorite.first_name} {favorite.last_name}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faStar}
                className={css`
                  margin-top: 0.5rem;
                  color: yellow;
                  background-color: transparent;
                `}
              />
            </div>
          ))}
        </div>
      )}
      {contactFavoriteList.length === 0 && !hideFavoriteList && (
        <div
          className={css`
            margin-top: 7.5rem;
            margin-bottom: 2rem;
            text-align: center;
            font-weight: bold;
            font-size: 1rem;
          `}
        >
          No Contact Favorite
        </div>
      )}

      {/* List Contacts */}
      {contactListData.length === 0 ? (
        <div
          className={css`
            margin-top: 50vh;
            text-align: center;
            font-weight: semi-bold;
            font-size: 1rem;
          `}
        >
          No Data
        </div>
      ) : (
        contactListData.map((contact, index) => (
          <div key={contact.id}>
            {contactListData[index - 1] && contactListData[index - 1].first_name[0].toUpperCase() !== contact.first_name[0].toUpperCase() && (
              <div
                className={css`
                  padding-left: 15px;
                  padding-top: 2px;
                  padding-bottom: 2px;
                  background-color: #bfbfbf;
                  margin-top: -8px;
                  color: #4c4a4a;
                  font-weight: bold;
                `}
              >
                {contact.first_name[0].toUpperCase()}
              </div>
            )}
            {index === 0 && (
              <div
                className={css`
                  padding-left: 15px;
                  padding-top: ${debounce ? "120px" : "2px"};
                  padding-bottom: 2px;
                  background-color: #bfbfbf;
                  margin-top: -8px;
                  color: #4c4a4a;
                  font-weight: bold;
                `}
              >
                {contact.first_name[0].toUpperCase()}
              </div>
            )}

            <div
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
                {InitialFirstLastName(contact.first_name as string, contact.last_name as string)}
              </div>
              <p
                className={css`
                  line-height: 2.2rem;
                `}
              >
                {contact.first_name} {contact.last_name}
              </p>
            </div>
          </div>
        ))
      )}
      {loadingData && (
        <div
          className={css`
            margin-top: 50vh;
            text-align: center;
            font-weight: semi-bold;
            font-size: 1rem;
          `}
        >
          Loading...
        </div>
      )}

      {/* Toast Handle Error Fetch Data */}
      <Toast isOpen={isOpenToastFetchData} summary={"Error"} detail={"Failed to fetch list contacts !"} severity={SeverityToast.ERROR} close={() => setIsOpenToastFetchData(false)} />
    </div>
  );
};

export default ListContacts;
