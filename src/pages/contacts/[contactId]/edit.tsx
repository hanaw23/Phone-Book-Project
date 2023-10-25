import { useRouter } from "next/router";

import AddEditContactNumber from "../../../common/components/organisms/forms/contacs/addEditContactNumber";

const NewContact = () => {
  const router = useRouter();
  const { contactId } = router.query;

  //   === FUNCTIONS ===
  const cancelEdit = () => {
    router.push(`/contacts/${contactId}`);
  };

  //   === HTML ===
  return (
    <>
      <AddEditContactNumber isEdit={true} cancel={cancelEdit} title="Edit Contacs" />
    </>
  );
};

export default NewContact;
