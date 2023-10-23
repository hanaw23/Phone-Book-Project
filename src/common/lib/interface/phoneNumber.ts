export interface PhoneNumber {
  id: number;
  phoneNumber: string;
}

export interface Phone {
  number: string;
}

export interface InputPhoneNumber {
  firstName: string;
  lastName: string;
  phones: Phone[];
}

export interface ContactPhoneNumber extends InputPhoneNumber {
  createdAt: string;
}
