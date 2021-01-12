import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then(res => res.data);

export const useData = (url) => {
  const { data, error } = useSWR(url, fetcher)

  return { data, error };
}
