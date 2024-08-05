import axios from "axios"

export const axiosProtected = () => {
    return axios.create({
        withCredentials: true
    })
}