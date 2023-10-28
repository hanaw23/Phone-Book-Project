import { useEffect, useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { css } from "@emotion/css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import ButtonComponent from "@/common/components/atoms/button";
import DeleteContactConfirmation from "@/common/components/organisms/confirmations/deleteContactNumber";
import Toast from "@/common/components/organisms/toast";
import Modal from "@/common/components/organisms/modal";

import { ContactContext } from "@/context/detailContactContext";
import { queryGetContactDetailById, mutationDeleteContactById } from "@/gql/graphql";
import { Contact } from "@/graphql/graphql";
import { SeverityToast } from "@/interface/toast.interface";

const DetailContact = () => {
  const router = useRouter();
  const { contactId } = router.query;

  // === GRAPHQL ===
  const { data, error } = useQuery(queryGetContactDetailById, {
    variables: {
      id: contactId,
    },
  });
  const [deleteContactById] = useMutation(mutationDeleteContactById);

  // === VARIABLES ===
  const { contactDetail, setContactDetail } = useContext(ContactContext);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [toastSuccess, setToastsuccess] = useState<boolean>(false);
  const [isOpenToastFetchData, setIsOpenToastFetchData] = useState<boolean>(false);
  const [_, setToastsuccessFetchData] = useState<boolean>(false);

  // === FUNCTIONS ===
  // onMounted
  useEffect(() => {
    if (error) {
      setToastsuccessFetchData(false);
      setIsOpenToastFetchData(true);
    } else if (data) {
      setContactDetail!(data.contact_by_pk);
    }
  }, [contactDetail, data, error, setContactDetail]);

  // Submit Delete Contact
  const submitDeleteContact = async () => {
    const response = await deleteContactById({
      variables: {
        id: contactId,
      },
    });

    if (response.errors) {
      setToastsuccess(false);
    } else if (response.data) {
      setToastsuccess(true);
      redirectToContactList();
    }

    setIsOpenToast(true);
  };

  const getInitialFirstLastName = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return "";
    return [firstName[0], lastName[0]].join("").toUpperCase();
  };

  const openDeleteModal = () => {
    setIsOpenModal(true);
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
                {contactDetail.phones.map((phone: any, index: number) => (
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
              <ButtonComponent label="Delete Contact" backgroundColor="#4c4a4a" type="button" borderRadius="5px" fontWeight="bold" color="white" width="100%" padding="10px" onClick={openDeleteModal} />
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      <Modal
        isOpen={isOpenModal}
        close={() => setIsOpenModal(false)}
        title="Delete Confirmation"
        content={<DeleteContactConfirmation message=" Are you sure want to delete this contact?" close={() => setIsOpenModal(false)} submitDelete={submitDeleteContact} />}
      />
      {/* Toast Handle Delete */}
      <Toast
        isOpen={isOpenToast}
        summary={toastSuccess ? "Success" : "Error"}
        detail={toastSuccess ? "Contact is successfully deleted" : "Failed to delete contact !"}
        severity={toastSuccess ? SeverityToast.SUCCESS : SeverityToast.ERROR}
        close={() => setIsOpenToast(false)}
      />
      {/* Toast Handle Error Fetch Data */}
      <Toast isOpen={isOpenToastFetchData} summary={"Error"} detail={"Failed to fetch contact !"} severity={SeverityToast.ERROR} close={() => setIsOpenToastFetchData(false)} />
    </>
  );
};

export default DetailContact;
