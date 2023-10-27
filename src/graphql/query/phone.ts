import { gql } from "@apollo/client";

export const queryGetPhoneList = gql`
  query GetPhoneList($where: phone_bool_exp, $distinct_on: [phone_select_column!], $limit: Int, $offset: Int, $order_by: [phone_order_by!]) {
    phone(where: $where, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by) {
      contact {
        last_name
        first_name
        id
      }
      number
    }
  }
`;
