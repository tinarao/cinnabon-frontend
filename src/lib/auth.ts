import { userValidator } from "@/validators/user.validator";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";



export const userQueryOptons = queryOptions({
    queryKey: ['user-data'],
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
        const res = await axios.get('http://localhost:3000/api/auth/session', {
            withCredentials: true,
        });

        const user = userValidator.parse(res.data);
        return user;
    }
})