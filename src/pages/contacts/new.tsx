import { useRouter } from "next/navigation";

import AddEditContactNumber from "../../common/components/organisms/forms/contacs/addEditContactNumber";

const NewContact = () => {
  const router = useRouter();

  //   === FUNCTIONS ===
  const cancelAddNew = () => {
    router.push("/contacts", { scroll: false });
  };

  //   === HTML ===
  return (
    <>
      <AddEditContactNumber isEdit={false} cancel={cancelAddNew} title="New Contacs" />
    </>
  );
};

export default NewContact;
