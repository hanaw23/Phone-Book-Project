const initialFirstLastName = (firstName: string, lastName: string) => {
  if (!firstName || !lastName) return "";
  return [firstName[0], lastName[0]].join("").toUpperCase();
};

export default initialFirstLastName;
