import React from "react"

const Footer = ({ }) => {

    return <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-8">
        <div className="flex flex-col">
            <span className="font-bold text-xl inline-block mb-3">About us</span>
            <span className="inline-block mb-3 text-sm">We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</span>
            <span className="inline-block mb-3 text-sm">All copyrights reserved <span className="text-xs">©</span> 2020 - Health Explore</span>
        </div>
        <div className="flex flex-col" >
            <span className="font-bold text-xl inline-block mb-3">Sitemap</span>
            <span className="inline-block mb-3 text-sm">Nurses</span>
            <span className="inline-block mb-3 text-sm">Employers</span>
            <span className="inline-block mb-3 text-sm">Social Networking</span>
            <span className="inline-block mb-3 text-sm">Jobs</span>
        </div>
        <div className="flex flex-col" >
            <span className="font-bold text-xl inline-block mb-3">Privacy</span>
            <span className="inline-block mb-3 text-sm">Terms of use</span>
            <span className="inline-block mb-3 text-sm">Privacy policy</span>
            <span className="inline-block mb-3 text-sm">Cookie policy</span>
        </div>
    </div>
}

export default Footer