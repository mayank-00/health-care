import React, { useState } from 'react'

import SearchIcon from "images/search-icon.svg"

let timer, timeoutVal = 1000, text = "", isError = false;

const SearchBar = ({ placeholder = "", updateSearchText, className = "" }) => {

    const [error, setError] = useState(false)
    const handleKeyUp = () => {
        clearTimeout(timer)

        if (isError) return

        timer = setTimeout(() => {
            updateSearchText(text)
        }, timeoutVal)
    }

    const handleOnChange = (event) => {
        clearTimeout(timer)

        if (new RegExp("[&<>\"\'\/]").test(event.target.value)) {
            isError = true
            setError(true)
            return
        }
        setError(false)
        isError = false

        text = event.target.value
    }

    return <><div className={`relative text-gray-600 focus-within:text-gray-400 ${className}`}>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none focus:shadow-outline">
                <SearchIcon />
            </button>
        </span>
        <input type="text" name="search_bar" id="search_bar" onChange={handleOnChange} defaultValue={text} onKeyUp={handleKeyUp} className="py-4 text-sm text-white rounded-md w-full pl-10 text-gray-600 focus:outline-none focus:bg-white focus:text-gray-900" placeholder={placeholder} autoComplete="off" />
    </div>
        <span className={`text-red-500 -mt-2 mb-5 text-sm ${!error ? "hidden" : "inline-block"}`}>{"Following symbols are not allowed & < > \" \' \/"}</span>
    </>

}

export default SearchBar