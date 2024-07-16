import axios from "axios";
import useSWR from "swr"

export const useGetRestaurantDetailsById = (id) => {

    const resId = { id: id}
    const url = `${process.env.REACT_APP_API_URL}/getRestaurantDetails`;
    const { data, error, isLoading } = useSWR([url, resId], fetcher);

    return {
        data, error, isLoading
    }

}


async function fetcher(url, data) {
    const res = await axios.post(url, data)
    return res?.data
}
