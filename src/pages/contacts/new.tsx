import { useRouter } from "next/router";
import AddEditContactNumber from "@/common/components/organisms/forms/addEditContactNumber";

const NewContact = () => {
  const router = useRouter();

  //   === FUNCTIONS ===
  const cancelAddNew = () => {
    router.push("/contacts");
  };

  //   === HTML ===
  return (
    <>
      <AddEditContactNumber isEdit={false} cancel={cancelAddNew} title="New Contacs" contactData={null} />
    </>
  );
};

export default NewContact;
