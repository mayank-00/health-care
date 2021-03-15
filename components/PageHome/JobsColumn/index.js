import React, { useState, useEffect } from "react"

import JobContainer from "./jobContainer";

import ArrowUp from "images/arrow-up.svg"
import ArrowDown from "images/arrow-down.svg"

const getTotalJobsCount = (jobs) => {

    let totalCount = 0;

    for (let i = 0, len = jobs.length; i < len; i++) {
        totalCount += jobs[i].total_jobs_in_hospital
    }

    return totalCount
}

const locationCompareFunction = (a, b, sortOrder) => {
    let cityA = a.city.toUpperCase(),
        cityB = b.city.toUpperCase();

    if (cityA < cityB) {
        return sortOrder == "asc" ? -1 : 1;
    }
    if (cityA > cityB) {
        return sortOrder == "asc" ? 1 : -1;
    }

    return 0;
}

const roleCompareFunction = (a, b, sortOrder) => {
    let job_titleA = a.job_title.toUpperCase(),
        job_titleB = b.job_title.toUpperCase();

    if (job_titleA < job_titleB) {
        return sortOrder == "asc" ? -1 : 1;
    }
    if (job_titleA > job_titleB) {
        return sortOrder == "asc" ? 1 : -1;
    }

    return 0;
}

const departmentCompareFunction = (a, b, sortOrder) => {
    return sortOrder == "asc" ? a.department.length - b.department.length : b.department.length - a.department.length
}

const experienceCompareFunction = (a, b, sortOrder) => {
    const epLevel = {
        "Internship": 1,
        "Junior": 2,
        "Intermediate": 3,
        "Senior": 4,
    }
    if (sortOrder == "asc") {
        return epLevel[a.experience] - epLevel[b.experience]
    }

    return epLevel[b.experience] - epLevel[a.experience]
}

const nextStateMapping = {
    "no_sort": "asc",
    "asc": "dsc",
    "dsc": "no_sort",
}

const sortStateTracker = {
    location: { state: "no_sort", compareFunction: locationCompareFunction },
    role: { state: "no_sort", compareFunction: roleCompareFunction },
    department: { state: "no_sort", compareFunction: departmentCompareFunction },
    experience: { state: "no_sort", compareFunction: experienceCompareFunction },
}

let sortOrderTracker = []


const filterJobs = (jobs) => {

    let updatedJobs = jobs

    sortOrderTracker.map(sortField => {

        const { state, compareFunction } = sortStateTracker[sortField]

        let tempJobs = []
        updatedJobs.map(job => {
            job.items.sort((a, b) => compareFunction(a, b, state))
            tempJobs.push(job)
        })

        updatedJobs = tempJobs

    })

    return updatedJobs
}

const getCopyOfJobs = (jobs) => {
    let newJobs = []
    jobs.map(job => {
        let newJ = { ...job }
        newJ.items = [...job.items]

        newJobs.push(newJ)
    })
    return newJobs
}

const SortLi = ({ field, onClick, name }) => {
    let state = sortStateTracker[field].state

    return <>
        <span className={`inline-block cursor-pointer ${state === "no_sort" ? "mr-3" : "mr-0.5"}`} id={field} onClick={onClick}>{name}</span>
        { state !== "no_sort" ? <span className="inline-block mr-3">{state === "asc" ? <ArrowUp className="text-gray-400" /> : <ArrowDown className="text-gray-400" />}</span> : null}
    </>
}

const JobsColumn = ({ jobs = [] }) => {

    const [filteredJobs, setFilteredJobs] = useState([])

    useEffect(() => {
        if (sortOrderTracker.length) {
            let fJobs = filterJobs(getCopyOfJobs(jobs))
            setFilteredJobs(fJobs)
        } else {
            setFilteredJobs(jobs)
        }
    }, [jobs])

    const onSortButtonClick = (event) => {

        let field = event.target.id

        sortStateTracker[field].state = nextStateMapping[sortStateTracker[field].state]

        if (sortStateTracker[field].state === "no_sort") {
            sortOrderTracker = sortOrderTracker.filter(filterf => filterf != field)
        } else if (sortStateTracker[field].state === "asc") {
            sortOrderTracker.push(field)
        }
        if (sortOrderTracker.length) {
            let fJobs = filterJobs(getCopyOfJobs(jobs))
            setFilteredJobs(fJobs)
        } else {
            setFilteredJobs(jobs)
        }
    }

    const totalJobsCount = jobs.length ? getTotalJobsCount(jobs) : 0

    return <div className="bg-white w-full p-4">
        <div className="py-5 flex justify-between text-sm items-center">
            <div><span><span className="font-semibold">{totalJobsCount}</span> job postings</span></div>
            <div className="hidden md:flex">
                <span className="inline-block mr-3 text-gray-400">Sort by</span>
                <SortLi field="location" onClick={onSortButtonClick} name="Location" />
                <SortLi field="role" onClick={onSortButtonClick} name="Role" />
                <SortLi field="department" onClick={onSortButtonClick} name="Department" />
                <span className="inline-block mr-3" id="education">Education</span>
                <SortLi field="experience" onClick={onSortButtonClick} name="Experience" />
            </div>
        </div>

        {
            filteredJobs.map((job, index) => {
                return <JobContainer job={job} key={`job-c-${index}`} />
            })
        }
    </div>
}

export default React.memo(JobsColumn)