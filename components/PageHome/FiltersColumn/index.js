import React, { useEffect, useState } from "react"

import CardShowingList from "components/CardShowingList"
import CardContainer from "./CardContainer"

const mapper = {
    job_type: "JOB TYPE",
    department: "DEPARTMENT",
    work_schedule: "WORK SCHEDULE",
    experience: "EXPERIENCE",
}

const FiltersColumn = ({ }) => {

    const [filters, setFiltersData] = useState({})

    useEffect(() => {
        getFilters()
    }, [])

    const getFilters = () => {
        fetch(`http://localhost:3999/api/filters`, {
            method: 'get',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setFiltersData(response)
            })
    }

    return <div className="mr-5 hidden md:block">
        {
            Object.keys(mapper).map((field, index) => {
                let list = filters[field] || []
                return <CardShowingList
                    key={`${field}-${index}`}
                    list={list.slice(0, 10)}
                    heading={mapper[field]}
                    className="bg-white mb-5"
                    leftFieldName="key"
                    rightFieldName="doc_count"
                >
                    {list.length > 10 ? <CardContainer heading={mapper[field]} list={list} /> : null}
                </CardShowingList>
            })
        }
    </div>
}

export default FiltersColumn