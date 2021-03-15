import React, { useState } from "react"

import DialogContainer from "components/DialogContainer"

const CardContainer = ({ heading, list }) => {

    const [showModal, setShowModal] = useState(false)

    const handleModalAction = () => {
        setShowModal(!showModal)
    }

    return <div>
        <span onClick={handleModalAction} className="text-blue-600 cursor-pointer">Show more</span>
        {
            showModal
                ?
                <DialogContainer>
                    <div class="bg-white">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:text-left">
                                <div className="flex px-3 py-5 justify-between border-b">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        {heading}
                                    </h3>
                                    <span className="text-sm cursor-pointer inline-block" onClick={handleModalAction}>X</span>
                                </div>
                                <div class="py-5 px-3 grid grid-cols-1 gap-3 md:grid-cols-4">
                                    {
                                        list.map(({ key, doc_count }, index) => {
                                            return <div key={`${key}-${index}`}>
                                                <span className="text-sm inline-block mr-2">{key}</span>
                                                <span className="text-xs text-gray-400">{doc_count}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContainer>
                :
                null
        }
    </div>
}

export default CardContainer