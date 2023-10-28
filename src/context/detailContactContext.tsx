import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import type { Contact } from "@/graphql/graphql";

type ContactProvideProvider = {
  children: ReactNode;
};

interface ContactContext {
  contactDetail: Contact;
  setContactDetail: Dispatch<SetStateAction<Contact>>;
}

export const ContactContext = createContext<Partial<ContactContext>>({});

export const ContactProvider = ({ children }: ContactProvideProvider) => {
  const [contactDetail, setContactDetail] = useState<Contact>({} as Contact);

  return (
    <>
      <ContactContext.Provider value={{ contactDetail, setContactDetail }}>{children}</ContactContext.Provider>
    </>
  );
};

export default ContactProvider;
