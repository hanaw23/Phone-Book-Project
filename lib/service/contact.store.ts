import { mutationAddContactWithPhones, mutationEditContactById, mutationDeleteContactById } from "../graphql/mutation/contact";
import { queryGetContactList, queryGetContactDetailById } from "../graphql/query/contact";
import { useMutation, useQuery } from "@apollo/client";

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
export const useAddContactWithPhones = () => {
  const [addContactWithPhones, response] = useMutation(mutationAddContactWithPhones);

  return { addContactWithPhones, response };
};
export const useEditContactById = () => {
  const [editContactById, response] = useMutation(mutationEditContactById);

  return { editContactById, response };
};
export const useDeleteContactById = (id: number) => {
  const [deleteContactById, response] = useMutation(mutationDeleteContactById, {
    variables: { id },
  });

  return { deleteContactById, response };
};
