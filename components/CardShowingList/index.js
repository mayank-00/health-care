import React from "react"

const CardShowingList = ({ list = [], heading = "", className = "", leftFieldName = "", rightFieldName = "", children }) => {

    return <div className={`p-3 ${className}`}>
        <span className="inline-block font-semibold text-sm mb-4">{heading}</span>
        {
            list.map((item, index) => {

                return <div key={`${item[leftFieldName]}-${index}`} className="mb-3">
                    <span className="text-sm inline-block mr-2">{item[leftFieldName]}</span>
                    <span className="text-xs text-gray-400">{item[rightFieldName]}</span>
                </div>
            })
        }
        {children}
    </div>
}

export default CardShowingList