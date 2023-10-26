import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "@/common/components/atoms/button";
import { useGetContactDetailById } from "../../../../lib/service/contact.store";
import { ContactPhoneNumber } from "../../../../lib/interface/phoneNumber";

const DetailContact = () => {
  const router = useRouter();
  const { contactId } = router.query;

  // === VARIABLES ===
  const [contactDetail, setContactDetail] = useState<ContactPhoneNumber | null>(null);

  //   === FUNCTIONS ===
  const fetchContactDetail = useGetContactDetailById(Number(contactId));

  // onMounted
  useEffect(() => {
    if (fetchContactDetail.error) {
      alert(fetchContactDetail.error);
    } else if (fetchContactDetail.data) {
      setContactDetail(fetchContactDetail.data.contact_by_pk as ContactPhoneNumber);
    }
  }, [fetchContactDetail]);

  const getInitialFirstLastName = (firstName: string, lastName: string) => {
    return [firstName[0], lastName[0]].join("").toUpperCase();
  };

  const redirectToDetailContact = () => {
    router.push(`/contacts/${contactId}/edit`);
  };
  const redirectToContactList = () => {
    router.push(`/contacts`);
  };

  return (
    <>
      {contactDetail && (
        <div>
          <div
            className={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 1rem;
              margin-bottom: 1rem;
              margin-left: 1rem;
              margin-right: 1rem;
            `}
          >
            <span>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={css`
                  color: #bfbfbf;
                  margin-right: 2px;
                  background-color: transparent;
                `}
              />
              <ButtonComponent label="Contacts" type="button" onClick={redirectToContactList} color="#BFBFBF" fontWeight="bold" />
            </span>
            <ButtonComponent label="Edit" type="button" fontWeight="bold" color="#7caa2d" onClick={redirectToDetailContact} />
          </div>

          <div
            className={css`
              margin-top: 4rem;
            `}
          >
            <div
              className={css`
                border: 2px solid #bfbfbf;
                border-radius: 50%;
                width: 150px;
                height: 150px;
                margin: auto;
                text-align: center;
                font-size: 4rem;
                padding-top: 1.5rem;
                background-color: #bfbfbf;
              `}
            >
              {getInitialFirstLastName(contactDetail.first_name, contactDetail.last_name)}
            </div>

            <div
              className={css`
                margin-top: 1rem;
              `}
            >
              <h2
                className={css`
                  text-align: center;
                `}
              >
                {contactDetail?.first_name} {contactDetail?.last_name}
              </h2>
            </div>

            {contactDetail?.phones && contactDetail?.phones.length > 0 && (
              <div
                className={css`
                  margin-top: 1rem;
                  margin-left: 1rem;
                  margin-right: 1rem;
                `}
              >
                {contactDetail.phones.map((phone, index) => (
                  <div
                    key={index}
                    className={css`
                      width: 100%;
                      background-color: #7caa2d;
                      border-radius: 5px;
                    `}
                  >
                    <p
                      className={css`
                        background-color: #7caa2d;
                        margin-bottom: 1rem;
                        margin-top: 1rem;
                        padding: 1rem;
                        border-radius: 5px;
                      `}
                    >
                      {phone.number}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div
              className={css`
                margin-top: 1rem;
                margin-left: 1rem;
                margin-right: 1rem;
              `}
            >
              <ButtonComponent label="Delete Contact" backgroundColor="#4c4a4a" type="button" borderRadius="5px" fontWeight="bold" color="white" width="100%" padding="10px" onClick={redirectToDetailContact} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailContact;