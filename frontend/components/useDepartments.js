import { GET_DEPARTMENTS_QUERY } from '../lib/queries/getDepartments'
import { useQuery } from "@apollo/client";

export function useDepartments() {
    const { data } = useQuery(GET_DEPARTMENTS_QUERY);
    return data?.departments;
}