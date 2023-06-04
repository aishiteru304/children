import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-red-500 text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm">&copy; 2023 All rights reserved.</span>
                    </div>
                    <div>
                        <ul className="flex space-x-4">
                            <li className="text-gray-400 hover:text-white transition duration-300 cursor-pointer">About
                            </li>

                            <li className="text-gray-400 hover:text-white transition duration-300 cursor-pointer">Services
                            </li>

                            <li className="text-gray-400 hover:text-white transition duration-300 cursor-pointer">Contact
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}
