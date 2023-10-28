import { useContext } from "react";
import { useRouter } from "next/router";
import AddEditContactNumber from "@/common/components/organisms/forms/addEditContactNumber";

import { ContactContext } from "@/context/detailContactContext";
import { Contact } from "@/graphql/graphql";

const NewContact = () => {
  const router = useRouter();
  const { contactId } = router.query;

  // === VARIABLES ===
  const { contactDetail } = useContext(ContactContext);

  //   === FUNCTIONS ===
  const cancelEdit = () => {
    router.push(`/contacts/${contactId}`);
  };

  //   === HTML ===
  return <>{contactDetail && <AddEditContactNumber isEdit={true} cancel={cancelEdit} title="Edit Contacs" contactData={contactDetail as Contact} />}</>;
};

export default NewContact;
