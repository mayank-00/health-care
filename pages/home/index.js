import React, { useEffect, useState } from "react"

import Header from "components/Header"
import Footer from "components/Footer"
import SearchBar from "components/SearchBar";
import FiltersColumn from "components/PageHome/FiltersColumn";
import JobsColumn from "components/PageHome/JobsColumn";

// import envVariables from "utils/envVariable";

let nextTextToSearch = ""

const Home = ({ }) => {

    const [jobs, setJobs] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        getJobs("")
    }, [])

    useEffect(() => {
        if (isFetching || nextTextToSearch == "") return
        getJobs(nextTextToSearch)
    }, [isFetching])

    const onSearchTextUpdate = (text) => {
        if (isFetching) {
            nextTextToSearch = text
            return
        }
        getJobs(text)
    }

    const getJobs = (text) => {

        setIsFetching(true)
        nextTextToSearch = ""

        fetch(`/api/jobs?search=${text}`, {
            method: 'get',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                setIsFetching(false)
                return response.json()
            })
            .then(response => {
                setJobs(response.jobs)
            })
    }

    return <div className="">
        <Header />
        <div className="bg-gray-100 p-5">
            <SearchBar className="mb-5" placeholder="Search for any job title, keywords or company" updateSearchText={onSearchTextUpdate} />
            <div className="flex">
                <FiltersColumn />
                <JobsColumn jobs={jobs} />
            </div>
        </div>
        <Footer />
    </div>
}

export default Home