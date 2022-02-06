import { GET_AUTHENTICATED_USER } from "../lib/queries/getAuthenticatedUser";
import { useQuery } from "@apollo/client";

export function useUser() {
    const { data } = useQuery(GET_AUTHENTICATED_USER);
    return data?.authenticatedItem;
}