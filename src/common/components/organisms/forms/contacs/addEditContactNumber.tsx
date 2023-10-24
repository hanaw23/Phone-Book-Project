import { useState } from "react";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

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
      <div>
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

      <div
        className={css`
          display: block;
          position: absolute;
          margin-top: 3rem;
          background-color: #7caa2d;
          height: max-content;
          width: 100%;
          border-radius: 2rem 2rem 0 0;
          padding-bottom: 3.5rem;
        `}
      >
        <div
          className={css`
            margin-top: 3rem;
            padding: 2rem;
            background-color: transparent;
          `}
        >
          <InputComponent label="First Name" placeholder="Type first name" required={true} value={firstName} componentClassName=" background-color: transparent;" onChange={(e) => setFirstName(e.target.value)} />
          <InputComponent
            label="Last Name"
            placeholder="Type last name"
            required={true}
            value={lastName}
            componentClassName="margin-top: 10px; background-color: transparent; margin-bottom: 2.5rem;"
            onChange={(e) => setLastName(e.target.value)}
          />

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
                  label="Phone Number"
                  placeholder="Ex. +62812347xxxx"
                  required={true}
                  value={phone.phoneNumber}
                  componentClassName="margin-top: 10px; width: 100%; background-color: transparent"
                  onChange={(e) => handleAddPhoneNumber(e, phone.id)}
                />
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
                  onClick={() => handleRemovePhones(phone.id)}
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
