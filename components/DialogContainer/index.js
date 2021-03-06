import React from "react"

const DialogContainer = ({ children }) => {
    return <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-200 opacity-75"></div>
            </div>


            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-4/5" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                {children}
            </div>
        </div>
    </div>
}

export default DialogContainer