import { mutationAddContactWithPhones, mutationEditContactById, mutationDeleteContactById, queryGetContactList, queryGetContactDetailById } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import type { Contact_Set_Input, Phone_Insert_Input } from "@/graphql/graphql";

// Fetch Queries
export const useGetContactList = (limit: number, offset: number) => {
  const response = useQuery(queryGetContactList, {
    variables: { limit, offset },
  });

  return response;
};
export const useGetContactDetailById = (id: number) => {
  const response = useQuery(queryGetContactDetailById, {
    variables: { id },
  });

  return response;
};

// Fetch Mutations
export const useAddContactWithPhones = (first_name: string, last_name: string, phones: Phone_Insert_Input[]) => {
  const [addContactWithPhones, response] = useMutation(mutationAddContactWithPhones, {
    variables: {
      first_name,
      last_name,
      phones,
    },
  });

  return { addContactWithPhones, response };
};
export const useEditContactById = (id: number, contact: Contact_Set_Input) => {
  const [editContactById, response] = useMutation(mutationEditContactById, {
    variables: { id, _set: contact },
  });

  return { editContactById, response };
};
export const useDeleteContactById = (id: number) => {
  const [deleteContactById, response] = useMutation(mutationDeleteContactById, {
    variables: { id },
  });

  return { deleteContactById, response };
};
