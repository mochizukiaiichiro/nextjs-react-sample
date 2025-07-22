import { useEffect } from "react";
import { useFetchUsers } from "./useFetchUsers"

export const useInitializeUsers = () => {
    const { userDataFetch, ...rest } = useFetchUsers();
    
    useEffect(() => {
        userDataFetch();
    }, []);

    return rest;
}