import { ChangeEvent, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import ButtonComponent from "@/common/components/atoms/button";
import InputComponent from "@/common/components/atoms/input";

import { Phone_Insert_Input } from "@/graphql/graphql";
import { mutationAddContactWithPhones } from "@/gql/graphql";

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

const AddEditContactNumber = (props: { isEdit: boolean; cancel: () => void; title: string }) => {
  const router = useRouter();

  // === GRAPHQL ===
  const [addContactNumber] = useMutation(mutationAddContactWithPhones);

  // === VARIABLES ===
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [phoneNumbers, setPhoneNumbers] = useState<Phone_Insert_Input[]>([{ id: 1, number: "" }]);

  const [isValidFirstName, setIsValidFirstName] = useState<Boolean>(true);
  const [isValidFirstNameChar, setIsValidFirstNameChar] = useState<Boolean>(true);
  const [isValidLastName, setIsValidLastName] = useState<Boolean>(true);
  const [isValidLastNameChar, setIsValidLastNameChar] = useState<Boolean>(true);
  const [isValidPhoneNumbers, setIsValidPhoneNumbers] = useState<Boolean>(true);

  // === FUNCTIONS ===
  const handleAddMorePhones = () => {
    setPhoneNumbers((current) => [...current, { id: current.length + 1, phoneNumber: "" }]);
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
    if (phoneNumbers.length > 0 && phoneNumbers[0].number !== "") {
      setIsValidPhoneNumbers(true);
    }
  }, [phoneNumbers, firstName, lastName, isValidFirstName, isValidLastName, isValidPhoneNumbers, isValidFirstNameChar, isValidLastNameChar]);

  const handleCheckSpecialCharacter = (value: string) => {
    const validInputNamePattern = /^[A-Za-z0-9_]+$/;
    return validInputNamePattern.test(value);
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

    if (firstName !== "" && lastName !== "" && includeEmptyPhoneNumber.length === 0 && validFirstNameCharacter && validLastNameCharcter) {
      if (props.isEdit) {
        // code for update contact
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
          console.log(response.errors);
        } else if (response.data) {
          router.push(`/contacts/${response.data.insert_contact.returning[0].id}`);
        }
      }
      setPhoneNumbers([{ id: 1, number: "" }]);
      setFirstName("");
      setLastName("");
    } else {
      setIsValidFirstName(false);
      setIsValidLastName(false);
      setIsValidPhoneNumbers(false);
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
          <img
            src="/profile.png"
            className={css`
              width: 35%;
              height: 35%;
              border-radius: 50%;
            `}
          />
        </div>
      </div>

      {/* Form */}
      <div
        className={css`
          display: block;
          position: absolute;
          margin-top: 3rem;
          background-color: #7caa2d;
          height: ${phoneNumbers.length > 2 ? "100%" : "62%"};
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
            colorLabel={isValidFirstName ? "white" : "#BF2B0A"}
            border={isValidFirstName ? "none" : "1px solid red"}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setFirstName(e.target.value as string)}
          />
          {!isValidFirstName && <WarningMessage message="First name cannot be empty" />}
          {!isValidFirstNameChar && isValidFirstName && <WarningMessage message="First name cannot contains special character" />}

          <InputComponent
            label="Last Name"
            placeholder="Type last name"
            required={true}
            value={lastName as string}
            colorLabel={isValidLastName ? "white" : "#BF2B0A"}
            border={isValidLastName ? "none" : "1px solid red"}
            componentClassName="margin-top: 10px; background-color: transparent;"
            onChange={(e: { target: { value: SetStateAction<string> } }) => setLastName(e.target.value as string)}
          />
          {!isValidLastName && <WarningMessage message="Last name cannot be empty" />}
          {!isValidLastNameChar && isValidLastName && <WarningMessage message="Last name cannot contains special character" />}

          {phoneNumbers.map((phone) => (
            <div
              key={phone.id}
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
                  label={`Phone Number ${phone.id}`}
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
              {phone.id === 1 && (
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
              {phoneNumbers.length > 1 && phone.id !== 1 && (
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
    </>
  );
};

export default AddEditContactNumber;
