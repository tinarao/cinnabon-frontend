import { userValidator } from "@/validators/user.validator";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { reqUri } from "./utils";



export const userQueryOptons = queryOptions({
    queryKey: ['user-data'],
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
        const url = reqUri("api/auth/session");
        const res = await axios.get(url, {
            withCredentials: true,
        });

        const user = userValidator.parse(res.data);
        return user;
    }
})