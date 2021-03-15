import React from "react"

import Button from "components/Button"

import { Button_Types } from "constants/index"

import Bars from "images/bars.svg"

const Header = ({ }) => {

    const onCreateJobClicked = () => { }

    return <div className="flex justify-between content-center text-base px-8 py-4 items-center">
        <div className="flex items-center">
            <span className="md:hidden inline-block mr-4 w-4 text-gray-400"><Bars className="fill-current text-gray-600" /></span>
            <span className="text-blue-400">HEALTH EXPLORE</span>
        </div>
        <div className="text-sm hidden md:block">
            <span className="font-normal mr-8">PROFILE</span>
            <span className="font-normal mr-8">JOBS</span>
            <span className="font-normal mr-8">PROFESSIONAL NETWORK</span>
            <span className="font-normal mr-8">LOUNGE</span>
            <span className="font-normal">SALARY</span>
        </div>
        <div className="text-sm flex items-center">
            <Button className="mr-8 md:inline-block hidden" name="CREATE JOB" type={Button_Types.ctaInverse} onClick={onCreateJobClicked} />
            <div className="relative w-8 h-8 md:mr-8 ">
                <div className="flex w-8 h-8 justify-center items-center rounded-full bg-blue-400 text-white font-semibold">
                    <span className="align-middle inline-block">Jo</span>
                </div>
                <div className=" flex justify-center items-center absolute -top-2 -right-1 h-4 w-4 text-white font-normal my-1 text-xs border-2 border-white rounded-full bg-red-600 z-2">
                    <span className="align-middle inline-block">2</span>
                </div>
            </div>
            <span className="hidden md:block font-normal">LOGOUT</span>
        </div>
    </div>
}

export default Header
