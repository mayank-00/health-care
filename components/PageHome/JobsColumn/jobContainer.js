import React, { useState } from "react"

import JobItem from "./JobItem";

const JobContainer = ({ job = {} }) => {

    const [isJobsExpanded, setIsJobsExpanded] = useState(false)

    const onListElementClick = () => {
        setIsJobsExpanded(!isJobsExpanded)
    }

    return <div className="mt-5">
        <div className={`flex my-1 py-1 items-center w-full cursor-pointer ${isJobsExpanded ? "pb-2" : ""}`} onClick={onListElementClick}>
            <div className="rounded p-1 bg-gray-200 text-white font-bold mr-3">{job.name ? job.name.slice(0, 2).toUpperCase() : ""}</div>
            <div className="text-xs">
                <span>{job.total_jobs_in_hospital} jobs for {job.name}</span>
            </div>
        </div>
        {
            isJobsExpanded
                ?
                job.items.map((item, index) => {
                    return <JobItem key={`item-i-${index}`} item={item} />
                })
                :
                null
        }
    </div>
}

export default JobContainer