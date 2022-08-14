import { useEffect, useState } from 'react';
import { getPages } from '../services';

const useListNotes = () => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    getAllPages();
  }, []);

  const getAllPages = async() => {
    const response = await getPages();
    if (response) {
        setPages(response);
    }
  }

  return pages;
}

export default useListNotes;