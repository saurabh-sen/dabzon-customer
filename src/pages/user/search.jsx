import React, { useState } from 'react'
import NavBar from '../../components/NavBar/index'
import FooterComponents from '../../components/FooterComponents/index'
import SearchComponent from '../../components/SearchComponent/index'

const Search = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className='Search'>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResults={searchResults} setSearchResults={setSearchResults} />
      <SearchComponent searchQuery={searchQuery} searchResults={searchResults} />
      <div className="footer hidden sm:block">
        <FooterComponents />
      </div>
    </div>
  )
}

export default Search