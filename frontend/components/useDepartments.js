import { GET_DEPARTMENTS } from '../lib/queries/getDepartments'
import { useQuery } from "@apollo/client";

export function useDepartments() {
    const { data } = useQuery(GET_DEPARTMENTS);
    return data?.departments;
}