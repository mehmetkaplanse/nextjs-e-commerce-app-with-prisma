import React from 'react'

const Search = () => {
  return (
    <div className='hidden md:flex flex-1'>
      <input className='py-2 px-3 rounded-s-lg rounde border-none outline-none flex flex-1' type="text" placeholder='Arama Yap...' />
      <button className='px-4 py-2 bg-orange-900 rounded-e-lg border border-white'>Ara</button>
    </div>
  )
}

export default Search