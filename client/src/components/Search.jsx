import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { options, Base_URL } from '../utils/api'


function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null)

  const handleOnchange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  const loadOptions = (inputValue) => {
    return fetch(
      `${Base_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        return {
          options: res.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`
            }
          })
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnchange}
      loadOptions={loadOptions}
    />
  )
}

export default Search
