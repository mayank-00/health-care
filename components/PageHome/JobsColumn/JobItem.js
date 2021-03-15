import React, { useState } from "react"

import Button from "components/Button"

import { Button_Types } from "constants/index"

import { timeDifference } from "utils"

const JobItem = ({ item = {} }) => {

    const [isItemExpanded, setIsItemExpanded] = useState(false)

    const onListElementClick = () => {
        setIsItemExpanded(!isItemExpanded)
    }

    const timeDiff = item.created ? timeDifference(new Date().getTime(), new Date(item.created).getTime()) : ""

    return <div className="py-4 border-t">
        <div className="cursor-pointer" onClick={onListElementClick}>
            <div className="flex mb-2 justify-between" >
                <span className="font-semibold text-sm">{item.job_title}</span>
                <span className="text-sm">{timeDiff}</span>
            </div>
            <div className="text-sm">
                <span>{item.job_type} | ${item.salary_range[0]} - ${item.salary_range[1]} an hour | {item.city}</span>
            </div>
        </div>

        {
            isItemExpanded
                ?
                <div className="md:flex mt-5">
                    <div className="md:w-2/3">
                        <div className="md:flex justify-between text-sm mb-3">
                            <span className="flex-1 font-semibold block md:inline-block">Department:</span>
                            <span className="flex-1 block md:inline-block">{item.department.join(", ")}</span>
                        </div>
                        <div className="md:flex justify-between text-sm mb-3">
                            <span className="flex-1 font-semibold block  md:inline-block">Hours / shifts:</span>
                            <span className="flex-1 block md:inline-block">{item.hours[0]} hours / {item.work_schedule}</span>
                        </div>
                        <div className="md:flex justify-between text-sm mb-3">
                            <span className="flex-1 font-semibold block md:inline-block">Summary:</span>
                            <span className="flex-1 block md:inline-block">{item.description}</span>
                        </div>
                    </div>
                    <div className="md:flex flex-col w=1/2 items-end justify-center md:w-1/3 text-sm">

                        <Button className="mb-2 md:w-1/2 mr-2 md:mr-0 rounded-md" name="Job details" type={Button_Types.primary} />
                        <Button className="job md:w-1/2 rounded-md" name="Save" type={Button_Types.ctaInverse} />
                    </div>
                </div>
                :
                null
        }
    </div>
}

export default JobItem