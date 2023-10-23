import { useRouter } from "next/navigation";

import ButtonComponent from "../../common/components/atoms/button";

const Contacts = () => {
  const router = useRouter();

  //   === FUNCTIONS ===
  const redirectNewContact = () => {
    router.push("/contacts/new", { scroll: false });
  };

  //   === HTML ===
  return (
    <>
      <ButtonComponent label="Add New" onClick={redirectNewContact} backgroundColor="#65766F" color="white" borderRadius="2px" type="button" />
    </>
  );
};

export default Contacts;
