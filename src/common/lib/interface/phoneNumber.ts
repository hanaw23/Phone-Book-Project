export interface PhoneNumber {
  id: number;
  phoneNumber: string;
}

export interface Phone {
  number: string;
}

export interface InputPhoneNumber {
  first_name: string;
  last_name: string;
  phones: Phone[];
}

export interface ContactPhoneNumber extends InputPhoneNumber {
  id: number;
  created_at: string;
}
