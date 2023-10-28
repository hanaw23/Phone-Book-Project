import { ChangeEvent, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Toast from "@/common/components/organisms/toast";
import ButtonComponent from "@/common/components/atoms/button";
import InputComponent from "@/common/components/atoms/input";
import InitialFirstLastName from "@/common/utils/initialName";

import { Contact, Phone_Insert_Input } from "@/graphql/graphql";
import { mutationAddContactWithPhones, mutationAddNumberToContact, mutationEditContactById, mutationEditPhoneNumber, queryGetContactList } from "@/gql/graphql";
import { SeverityToast } from "@/interface/toast.interface";

const WarningMessage = (props: { message: string }) => {
  return (
    <small
      className={css`
        color: #bf2b0a;
        margin-top: 1px;
        margin-bottom: 2px;
        font-weight: semi-bold;
        font-size: 0.8rem;
        background-color: transparent;
      `}
    >
      {props.message}
    </small>
  );
};

const AddEditContactNumber = (props: { isEdit: boolean; cancel: () => void; title: string; contactData: Contact | null }) => {
  const router = useRouter();

  // === VARIABLES ===
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumbers, setPhoneNumbers] = useState<Phone_Insert_Input[]>([{ id: 0, number: "" }]);
  const [debounceFirstName, setDebounceFirstName] = useState<string>("");
  const [debounceLastName, setDebounceLastName] = useState<string>("");

  const [isValidFirstName, setIsValidFirstName] = useState<boolean>(true);
  const [isValidFirstNameChar, setIsValidFirstNameChar] = useState<boolean>(true);
  const [isValidLastName, setIsValidLastName] = useState<boolean>(true);
  const [isValidLastNameChar, setIsValidLastNameChar] = useState<boolean>(true);
  const [isValidPhoneNumbers, setIsValidPhoneNumbers] = useState<boolean>(true);
  const [isUniqueName, setIsUniqueName] = useState<boolean>(true);

  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [isOpenToastUniqueName, setIsOpenToastUniqueName] = useState<boolean>(false);
  const [toastSuccess, setToastsuccess] = useState<boolean>(false);

  // === GRAPHQL ===
  const [addContactNumber] = useMutation(mutationAddContactWithPhones);
  const [editContactById] = useMutation(mutationEditContactById);
  const [addPhoneNumberToContact] = useMutation(mutationAddNumberToContact);
  const [editPhoneNumberToContact] = useMutation(mutationEditPhoneNumber);

  const { data } = useQuery(queryGetContactList, {
    variables: {
      where: {
        _and: [
          {
            first_name: {
              _eq: `${debounceFirstName}`,
            },
          },
          {
            last_name: {
              _eq: `${debounceLastName}`,
            },
          },
        ],
      },
    },
  });

  // === FUNCTIONS ===
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [firstName, lastName]);

  useEffect(() => {
    if (props.contactData) {
      setFirstName(props.contactData.first_name);
      setLastName(props.contactData.last_name);
      setPhoneNumbers(
        props.contactData.phones?.map((phone) => {
          return { id: phone.id, number: phone.number };
        })
      );
    }
  }, [props.contactData]);

  const handleAddMorePhones = () => {
    setPhoneNumbers((current) => [...current, { id: current.length + 1, number: "" }]);
  };
  const handleRemovePhones = (id: number) => {
    setPhoneNumbers((current) => {
      const newPhoneNumbers = current.filter((phone) => phone.id !== id);
      return [...newPhoneNumbers];
    });
  };
  const handleAddPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setPhoneNumbers((current) => {
      for (const phone of current) {
        if (phone.id === id) {
          phone.number = event.target.value;
        }
      }
      return [...current];
    });
  };

  // Validations
  useEffect(() => {
    if (firstName !== "") {
      setIsValidFirstName(true);
    }
    if (handleCheckSpecialCharacter(firstName as string)) {
      setIsValidFirstNameChar(true);
    }
    if (lastName !== "") {
      setIsValidLastName(true);
    }
    if (handleCheckSpecialCharacter(lastName as string)) {
      setIsValidLastNameChar(true);
    }
    if (phoneNumbers && phoneNumbers.length > 0 && phoneNumbers[0].number !== "") {
      setIsValidPhoneNumbers(true);
    }
  }, [phoneNumbers, firstName, lastName, isValidFirstName, isValidLastName, isValidPhoneNumbers, isValidFirstNameChar, isValidLastNameChar]);

  const handleCheckSpecialCharacter = (value: string) => {
    const validInputNamePattern = /^[A-Za-z0-9_]+$/;
    return validInputNamePattern.test(value);
  };

  useEffect(() => {
    if (data?.contact.length > 0) {
      setIsUniqueName(false);
    } else {
      setIsUniqueName(true);
    }
  }, [data?.contact.length, debounceFirstName, debounceLastName]);

  // Submit Function
  const addPhoneNumberToContactMethod = async () => {
    const isSuccessAdd = [] as boolean[];
    // add phone number if phone number length is not same with phone number props
    if (props.contactData?.phones && props.contactData?.phones.length < phoneNumbers.length) {
      for (let i = 0; i < phoneNumbers.length; i++) {
        if (i > props.contactData?.phones.length - 1) {
          const responseAddPhoneNumber = await addPhoneNumberToContact({
            variables: {
              contact_id: props.contactData?.id,
              phone_number: phoneNumbers[i].number,
            },
          });
          if (responseAddPhoneNumber.data) {
            isSuccessAdd.push(true);
          } else if (responseAddPhoneNumber.errors) {
            isSuccessAdd.push(false);
          }
        }
      }
    }

    return isSuccessAdd;
  };

  const editPhoneNumberToContactMethod = async () => {
    const isSuccessEdit = [] as boolean[];

    // edit phone number if phone number length is same with phone number props but have different value
    if (props.contactData?.phones) {
      for (let i = 0; i < props.contactData?.phones.length; i++) {
        for (let n = 0; i < phoneNumbers.length; i++) {
          if (props.contactData?.phones[i]?.number !== phoneNumbers[n]?.number && props.contactData?.phones[i]?.id === phoneNumbers[n]?.id) {
            const responseEditPhoneNumber = await editPhoneNumberToContact({
              variables: {
                pk_columns: {
                  number: props.contactData?.phones[i].number,
                  contact_id: props.contactData?.id,
                },
                new_phone_number: phoneNumbers[n].number,
              },
            });

            if (responseEditPhoneNumber.data) {
              isSuccessEdit.push(true);
            } else if (responseEditPhoneNumber.errors) {
              isSuccessEdit.push(false);
            }
          }
        }
      }
    }

    return isSuccessEdit;
  };

  const submitAddEditContactNumber = async () => {
    const includeEmptyPhoneNumber = phoneNumbers.filter((phone) => phone.number === "");
    const validFirstNameCharacter = handleCheckSpecialCharacter(firstName as string);
    const validLastNameCharcter = handleCheckSpecialCharacter(lastName as string);

    if (!validFirstNameCharacter) {
      setIsValidFirstNameChar(false);
    }
    if (!validLastNameCharcter) {
      setIsValidLastNameChar(false);
    }

    if (firstName !== "" && lastName !== "" && includeEmptyPhoneNumber.length === 0 && validFirstNameCharacter && validLastNameCharcter && isUniqueName) {
      if (props.isEdit) {
        let isSuccessEdit;
        const reponseAddPhone = await addPhoneNumberToContactMethod();
        const reponseEditPhone = await editPhoneNumberToContactMethod();

        if (props.contactData?.first_name !== firstName || props.contactData?.last_name !== lastName) {
          const response = await editContactById({
            variables: {
              id: props.contactData?.id,
              _set: {
                first_name: firstName,
                last_name: lastName,
              },
            },
          });

          if (response.errors) {
            isSuccessEdit = false;
          } else if (response.data) {
            isSuccessEdit = true;
          }
        }

        if (reponseAddPhone.includes(false) || reponseEditPhone.includes(false) || isSuccessEdit === false) {
          setToastsuccess(false);
        } else if (reponseAddPhone.includes(true) || reponseEditPhone.includes(true) || isSuccessEdit === true) {
          setToastsuccess(true);
          setPhoneNumbers([{ id: 0, number: "" }]);
          setFirstName("");
          setLastName("");
          router.push(`/contacts/${props.contactData?.id}`);
        }
      } else {
        const newPhoneNumbers = [] as Phone_Insert_Input[];
        for (const phone of phoneNumbers) {
          newPhoneNumbers.push({ number: phone.number });
        }
        const response = await addContactNumber({
          variables: {
            first_name: firstName,
            last_name: lastName,
            phones: newPhoneNumbers,
          },
        });
        if (response.errors) {
          setToastsuccess(false);
        } else if (response.data) {
          setToastsuccess(true);
          router.push(`/contacts/${response.data.insert_contact.returning[0].id}`);

          setPhoneNumbers([{ id: 0, number: "" }]);
          setFirstName("");
          setLastName("");
        }
      }

      setIsOpenToast(true);
    } else {
      setIsValidFirstName(false);
      setIsValidLastName(false);
      setIsValidPhoneNumbers(false);

      if (!isUniqueName) {
        setIsOpenToastUniqueName(true);
      }
    }
  };

  //   === HTML ===
  return (
    <>
      {/* Header & Button */}
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
            <ButtonComponent label="Back" type="button" onClick={props.cancel} color="#BFBFBF" fontWeight="bold" />
          </span>

          <h3>{props.title}</h3>

          <ButtonComponent label={`${props.isEdit ? "Update" : "Add"}`} type="button" fontWeight="bold" color="#7caa2d" onClick={submitAddEditContactNumber} />
        </div>

        <div
          className={css`
            margin-top: 4rem;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: center;
          `}
        >
          {firstName === "" || lastName === "" ? (
            <img
              src={"/profile.png"}
              className={css`
                width: 35%;
                height: 35%;
                border-radius: 50%;
              `}
              alt="profile"
            />
          ) : (
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
              {InitialFirstLastName(firstName as string, lastName as string)}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div
        className={css`
          display: block;
          position: absolute;
          margin-top: 3rem;
          background-color: #7caa2d;
          height: ${phoneNumbers && phoneNumbers?.length > 2 ? "100%" : "62%"};
          width: 100%;
          border-radius: 2rem 2rem 0 0;
          margin-bottom: 0;
        `}
      >
        <div
          className={css`
            margin-top: 3rem;
            padding: 2rem;
            background-color: transparent;
          `}
        >
          <InputComponent
            label="First Name"
            placeholder="Type first name"
            required={true}
            value={firstName as string}
            componentClassName=" background-color: transparent;"
            colorLabel={isValidFirstName && isValidFirstNameChar ? "white" : "#BF2B0A"}
            border={isValidFirstName && isValidFirstNameChar ? "none" : "1px solid red"}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setFirstName(e.target.value as string)}
          />
          {!isValidFirstName && <WarningMessage message="First name cannot be empty" />}
          {!isValidFirstNameChar && isValidFirstName && <WarningMessage message="First name cannot contains special character" />}

          <InputComponent
            label="Last Name"
            placeholder="Type last name"
            required={true}
            value={lastName as string}
            colorLabel={isValidLastName && isValidLastNameChar ? "white" : "#BF2B0A"}
            border={isValidLastName && isValidLastNameChar ? "none" : "1px solid red"}
            componentClassName="margin-top: 10px; background-color: transparent;"
            onChange={(e: { target: { value: SetStateAction<string> } }) => setLastName(e.target.value as string)}
          />
          {!isValidLastName && <WarningMessage message="Last name cannot be empty" />}
          {!isValidLastNameChar && isValidLastName && <WarningMessage message="Last name cannot contains special character" />}

          {phoneNumbers?.map((phone, index) => (
            <div
              key={index}
              className={css`
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                background-color: transparent;
              `}
            >
              <div
                className={css`
                  width: 100%;
                  background-color: transparent;
                `}
              >
                <InputComponent
                  label={`Phone Number ${index + 1}`}
                  placeholder="Ex. +62812347xxxx"
                  required={true}
                  value={phone.number as string}
                  componentClassName="margin-top: 10px; width: 100%; background-color: transparent"
                  colorLabel={isValidPhoneNumbers ? "white" : "#BF2B0A"}
                  border={isValidPhoneNumbers ? "none" : "1px solid red"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddPhoneNumber(e, phone.id as number)}
                />
                {!isValidPhoneNumbers && <WarningMessage message="Phone number cannot be empty" />}
              </div>
              {index === 0 && (
                <FontAwesomeIcon
                  icon={faPlus}
                  className={css`
                    margin-top: 2.3rem;
                    color: white;
                    background-color: transparent;
                  `}
                  onClick={handleAddMorePhones}
                />
              )}
              {phoneNumbers.length > 1 && !props.isEdit && index !== 0 && (
                <FontAwesomeIcon
                  icon={faMinus}
                  className={css`
                    margin-top: 2.3rem;
                    color: white;
                    background-color: transparent;
                  `}
                  onClick={() => handleRemovePhones(phone.id as number)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      <Toast
        isOpen={isOpenToast}
        summary={toastSuccess ? "Success" : "Error"}
        detail={toastSuccess ? `Contact is successfully ${props.isEdit ? "updated" : "created"}` : `Failed to ${props.isEdit ? "update" : "create"} contact !`}
        severity={toastSuccess ? SeverityToast.SUCCESS : SeverityToast.ERROR}
        close={() => setIsOpenToast(false)}
      />
      <Toast isOpen={isOpenToastUniqueName} summary={"Warning"} detail={`Contact with name ${firstName} ${lastName} is already exist !`} severity={SeverityToast.WARN} close={() => setIsOpenToastUniqueName(false)} />
    </>
  );
};

export default AddEditContactNumber;
