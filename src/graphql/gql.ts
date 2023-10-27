/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetContactList($distinct_on: [contact_select_column!], $limit: Int, $offset: Int, $order_by: [contact_order_by!], $where: contact_bool_exp) {\n    contact(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {\n      created_at\n      first_name\n      id\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n": types.GetContactListDocument,
    "\n  query GetContactDetail($id: Int!) {\n    contact_by_pk(id: $id) {\n      last_name\n      id\n      first_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n": types.GetContactDetailDocument,
    "\n  mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {\n    insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {\n      returning {\n        first_name\n        last_name\n        id\n        phones {\n          number\n        }\n      }\n    }\n  }\n": types.AddContactWithPhonesDocument,
    "\n  mutation EditContactById($id: Int!, $_set: contact_set_input) {\n    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n": types.EditContactByIdDocument,
    "\n  mutation MyMutation($id: Int!) {\n    delete_contact_by_pk(id: $id) {\n      first_name\n      last_name\n      id\n    }\n  }\n": types.MyMutationDocument,
    "\n  query GetPhoneList($where: phone_bool_exp, $distinct_on: [phone_select_column!], $limit: Int, $offset: Int, $order_by: [phone_order_by!]) {\n    phone(where: $where, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by) {\n      contact {\n        last_name\n        first_name\n        id\n      }\n      number\n    }\n  }\n": types.GetPhoneListDocument,
    "\n  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {\n    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {\n      returning {\n        contact {\n          id\n          last_name\n          first_name\n          phones {\n            number\n          }\n        }\n      }\n    }\n  }\n": types.AddNumberToContactDocument,
    "\n  mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number: String!) {\n    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $new_phone_number }) {\n      contact {\n        id\n        last_name\n        first_name\n        created_at\n        phones {\n          number\n        }\n      }\n    }\n  }\n": types.EditPhoneNumberDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContactList($distinct_on: [contact_select_column!], $limit: Int, $offset: Int, $order_by: [contact_order_by!], $where: contact_bool_exp) {\n    contact(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {\n      created_at\n      first_name\n      id\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContactList($distinct_on: [contact_select_column!], $limit: Int, $offset: Int, $order_by: [contact_order_by!], $where: contact_bool_exp) {\n    contact(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {\n      created_at\n      first_name\n      id\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContactDetail($id: Int!) {\n    contact_by_pk(id: $id) {\n      last_name\n      id\n      first_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContactDetail($id: Int!) {\n    contact_by_pk(id: $id) {\n      last_name\n      id\n      first_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {\n    insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {\n      returning {\n        first_name\n        last_name\n        id\n        phones {\n          number\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {\n    insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {\n      returning {\n        first_name\n        last_name\n        id\n        phones {\n          number\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditContactById($id: Int!, $_set: contact_set_input) {\n    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditContactById($id: Int!, $_set: contact_set_input) {\n    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MyMutation($id: Int!) {\n    delete_contact_by_pk(id: $id) {\n      first_name\n      last_name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation MyMutation($id: Int!) {\n    delete_contact_by_pk(id: $id) {\n      first_name\n      last_name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPhoneList($where: phone_bool_exp, $distinct_on: [phone_select_column!], $limit: Int, $offset: Int, $order_by: [phone_order_by!]) {\n    phone(where: $where, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by) {\n      contact {\n        last_name\n        first_name\n        id\n      }\n      number\n    }\n  }\n"): (typeof documents)["\n  query GetPhoneList($where: phone_bool_exp, $distinct_on: [phone_select_column!], $limit: Int, $offset: Int, $order_by: [phone_order_by!]) {\n    phone(where: $where, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by) {\n      contact {\n        last_name\n        first_name\n        id\n      }\n      number\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {\n    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {\n      returning {\n        contact {\n          id\n          last_name\n          first_name\n          phones {\n            number\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {\n    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {\n      returning {\n        contact {\n          id\n          last_name\n          first_name\n          phones {\n            number\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number: String!) {\n    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $new_phone_number }) {\n      contact {\n        id\n        last_name\n        first_name\n        created_at\n        phones {\n          number\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number: String!) {\n    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $new_phone_number }) {\n      contact {\n        id\n        last_name\n        first_name\n        created_at\n        phones {\n          number\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;