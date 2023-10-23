import { useState } from "react";
import { css } from "@emotion/css";

import ButtonComponent from "../../../atoms/button";
import InputComponent from "../../../atoms/input";
import { type PhoneNumber } from "../../../../lib/interface/phoneNumber";

const AddEditContactNumber = (props: { isEdit: boolean; cancel: () => void; title: string }) => {
  // === VARIABLES ===
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([{ id: 1, phoneNumber: "" }] as PhoneNumber[]);

  //   === FUNCTIONS ===
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
          phone.phoneNumber = event.target.value;
        }
      }
      return [...current];
    });
  };

  //   Submit Add/Edit Contact Number
  const submitAddEditContactNumber = () => {
    if (props.isEdit) {
      alert(phoneNumbers.map((phone) => phone.phoneNumber));
    } else {
      alert(phoneNumbers.map((phone) => phone.phoneNumber));
    }
  };

  //   === HTML ===
  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 1rem;
          margin-bottom: 1rem;
          margin-left: 2rem;
          margin-right: 2rem;
        `}
      >
        <ButtonComponent label="Cancel" type="button" onClick={props.cancel} color="#BFBFBF" fontWeight="bold" />

        <h3>{props.title}</h3>

        <ButtonComponent label={`${props.isEdit ? "Update" : "Add"}`} type="button" fontWeight="bold" color="#37A603" onClick={submitAddEditContactNumber} />
      </div>

      <div>
        <div
          className={css`
            margin-top: 10rem;
            margin-left: 2rem;
            margin-right: 2rem;
          `}
        >
          <InputComponent label="First Name" placeholder="Type first name" required={true} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <InputComponent label="Last Name" placeholder="Type last name" required={true} value={lastName} componentClassName="margin-top: 10px;" onChange={(e) => setLastName(e.target.value)} />

          {phoneNumbers.map((phone) => (
            <div key={phone.id}>
              <InputComponent
                label="Phone Number"
                placeholder="Ex. +62812347xxxx"
                required={true}
                value={phone.phoneNumber}
                componentClassName="margin-top: 10px; background-color: none"
                onChange={(e) => handleAddPhoneNumber(e, phone.id)}
              />
              {phoneNumbers.length > 1 && <ButtonComponent label="Remove" type="button" fontWeight="bold" backgroundColor="#37A603" color="white" onClick={() => handleRemovePhones(phone.id)} />}
            </div>
          ))}

          <div
            className={css`
              margin-top: 5rem;
              display: flex;
              justify-content: flex-center;
              text-align: center;
            `}
          >
            <ButtonComponent label="Add more phones" type="button" fontWeight="bold" backgroundColor="#37A603" color="white" onClick={handleAddMorePhones} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditContactNumber;
