import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import AddEditContactNumber from "@/common/components/organisms/forms/addEditContactNumber";
import Toast from "@/common/components/organisms/toast";

import { ContactContext } from "@/context/detailContactContext";
import { Contact } from "@/graphql/graphql";
import { queryGetContactDetailById, mutationDeleteContactById } from "@/gql/graphql";
import { SeverityToast } from "@/interface/toast.interface";

const EditContact = () => {
  const router = useRouter();
  const { contactId } = router.query;

  // === GRAPHQL ===
  const { data, error } = useQuery(queryGetContactDetailById, {
    variables: {
      id: contactId,
    },
  });

  // === VARIABLES ===
  const { contactDetail, setContactDetail } = useContext(ContactContext);

  const [isOpenToastFetchData, setIsOpenToastFetchData] = useState<boolean>(false);
  const [_, setToastsuccessFetchData] = useState<boolean>(false);

  //   === FUNCTIONS ===
  // onMounted
  useEffect(() => {
    if (error) {
      setToastsuccessFetchData(false);
      setIsOpenToastFetchData(true);
    } else if (data) {
      setContactDetail!(data.contact_by_pk);
    }
  }, [contactDetail, data, error, setContactDetail]);

  const cancelEdit = () => {
    router.push(`/contacts/${contactId}`);
  };

  //   === HTML ===
  return (
    <>
      {contactDetail && <AddEditContactNumber isEdit={true} cancel={cancelEdit} title="Edit Contacs" contactData={contactDetail as Contact} />}

      {/* Toast Handle Error Fetch Data */}
      <Toast isOpen={isOpenToastFetchData} summary={"Error"} detail={"Failed to fetch contact !"} severity={SeverityToast.ERROR} close={() => setIsOpenToastFetchData(false)} />
    </>
  );
};

export default EditContact;
