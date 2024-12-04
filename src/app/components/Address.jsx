import React, { useState } from "react";

const Address = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState({
        address: "",
        landmark: "",
        city: "",
        postalCode: "",
    });

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", address);

        // Add or update the address logic here
        alert("Address saved successfully!");
        setAddress({
            address: "",
            landmark: "",
            city: "",
            state: "",
            postalCode: "",
        });
        toggleModal();
    };
    return (
        <div className="bg-white h-full shadow-md rounded-md px-8 pt-6 pb-8">
            <h2 className="text-lg font-bold mb-4">Address</h2>
            {/* Trigger to open modal */}
            <button
                onClick={toggleModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
                Add New Address
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <h3 className="text-xl font-semibold mb-4">Add New  Address</h3>
                        <form onSubmit={handleFormSubmit}>
                            {/* Address Line 1 */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address.address}
                                    placeholder="Address"
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                    required
                                />
                            </div>

                            {/* Address Line 2 */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="landmark"
                                    name="landmark"
                                    value={address.landmark}
                                    onChange={handleInputChange}
                                    placeholder="Landmark"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div className=" flex w-full gap-4 mb-4">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={address.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    className="w-1/2 border border-gray-300 rounded px-4 py-2"
                                    required
                                />
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={address.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="Postal Code"
                                    className="w-1/2 border border-gray-300 rounded px-4 py-2"
                                    required
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                >
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Address;
