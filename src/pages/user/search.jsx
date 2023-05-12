import React, { useState, useCallback } from 'react'
import NavBar from '../../components/NavBar/index'
import FooterComponents from '../../components/FooterComponents/index'
import SearchComponent from '../../components/SearchComponent/index'
import { setLoading } from '@/src/reduxStore/Slices/Loader/LoaderSlice'
import { useDispatch } from 'react-redux'

const Search = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const debounce = (cb, d) => {
    let timer;
    return function (searchQuery) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(searchQuery);
      }, d);
    };
  };

  const handleSearch = async (searchQuery) => {
    if (searchQuery.length === 0) return;
    dispatch(setLoading(true));
    const response = await fetch(`/api/search/${searchQuery}`);
    const data = await response.json();
    setSearchResults(data.msg);
    dispatch(setLoading(false));
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  const handleSearchProduct = (e) => {
    e.preventDefault();
    setSearchQuery(searchQuery => searchQuery = e.target.value.toLowerCase());
    debouncedHandleSearch(e.target.value.toLowerCase());
  }

  return (
    <div className='Search'>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchProduct={handleSearchProduct} />
      <SearchComponent setSearchQuery={setSearchQuery} searchQuery={searchQuery} searchResults={searchResults} handleSearchProduct={handleSearchProduct} />
      <div className="footer hidden sm:block">
        <FooterComponents />
      </div>
    </div>
  )
}

export default Search