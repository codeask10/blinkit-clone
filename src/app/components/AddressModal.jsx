'use client'

import React, { useState, useContext, useEffect } from "react";
import { LoadScript, Autocomplete, } from "@react-google-maps/api";
import { FaSearchLocation } from "react-icons/fa";
import { CommonContext } from "../context/CommonContext";
import { fetchData } from "../api/globalApi";
import { URL } from "../../../config";

const AddressModal = ({ isOpen, onAddressSelect }) => {
    const { common } = useContext(CommonContext);
    const { organization } = common;
    const { pickupLocations } = organization;
    const GOOGKE_API_KEY = organization?.config?.website?.googleApisKey;
    const [selectedStore, setSelectedStore] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
    const [customAddress, setCustomAddress] = useState("");
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressType, setAddressType] = useState("pickup");
    const [isDeliver, setDeliver] = useState(false)

    const containerStyle = {
        width: "100%",
        height: "300px",
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    const getServiceable = async (selectedAddress) => {
        try {
            const filteredAddress = Object.fromEntries(
                Object.entries(selectedAddress).filter(
                    ([_, value]) => value !== undefined && value !== null && value !== ''
                )
            );
            const queryString = new URLSearchParams(filteredAddress).toString();
            const response = await fetchData(`${URL}/api/serviceable-area?${queryString}`, "GET");

            if (response.status === "SUCCESS") {
                if (response.data) {
                    setDeliver(false); // Serviceable location
                    onAddressSelect(customAddress);
                } else {
                    setDeliver(true); // Not serviceable
                }
            } else {
                console.error("Failed to check serviceability:", response.message);
                setDeliver(false); // Default to not serviceable on error
            }
        } catch (error) {
            console.error("Error occurred during serviceability check:", error);
            setDeliver(false); // Default to not serviceable on exception
        }
    };

    useEffect(() => {
        if (selectedAddress) {
            getServiceable(selectedAddress);
        }
    }, [selectedAddress])

    const handleLoad = (autoC) => {
        setAutocomplete(autoC);
    };
    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            // Extract address components
            const addressComponents = place.address_components || [];
            const getAddressComponent = (type) => {
                const component = addressComponents.find((component) => component.types.includes(type));
                return component ? (type === "country" ? component.short_name : component.long_name) : undefined;
            };

            const city = getAddressComponent("locality");
            const state = getAddressComponent("administrative_area_level_1");
            const country = getAddressComponent("country");
            const pincode = getAddressComponent("postal_code");
            const formattedAddress = place.formatted_address;
            setCustomAddress(formattedAddress);
            setSelectedAddress({
                city: city || "",
                pincode: pincode || "",
                state: state || "",
                countryCode: country || "",
                lat: place?.geometry?.location?.lat(),
                lng: place?.geometry?.location?.lng(),
            });
        }

    };
    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setSelectedAddress({
                        type: "current",
                        address: "Current Location",
                        location: { lat: latitude, lng: longitude },
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleStoreSelection = (store) => {
        setSelectedStore(store.id);
        onAddressSelect(store.Store);
    };
    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 max-h-[70vh] overflow-y-auto">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="addressType"
                                value="pickup"
                                checked={addressType === "pickup"}
                                onChange={() => setAddressType("pickup")}
                            />
                            <span>Collect from</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="addressType"
                                value="delivery"
                                checked={addressType === "delivery"}
                                onChange={() => setAddressType("delivery")}
                            />
                            <span>Delivery Address</span>
                        </label>
                    </div>

                    {addressType === "pickup" && (
                        <div className="mb-4">
                            <h3 className="text-lg font-medium mb-2">Collect From:</h3>
                            <div className="space-y-2 text-sm ">
                                {pickupLocations?.map((store, index) => (
                                    <label key={`${store?.id}+ ${index}`} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="store"
                                            value={store?.id}
                                            checked={selectedStore === store?.id}
                                            onChange={() => handleStoreSelection(store)}
                                        />
                                        <span >{store?.address}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {addressType === "delivery" && (
                        <div className="mb-4">
                            <h3 className="text-lg font-medium mb-2">Enter Address:</h3>
                            <LoadScript id="script-loader" googleMapsApiKey={GOOGKE_API_KEY} libraries={["places"]}>
                                <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            className="w-full border rounded px-4 py-2"
                                            placeholder="Enter address"
                                            value={customAddress}
                                            onChange={(e) => setCustomAddress(e.target.value)}
                                        />
                                        <FaSearchLocation className="text-gray-500" size={24} />
                                    </div>
                                </Autocomplete>
                            </LoadScript>
                            {isDeliver && (
                                <div className="text-sm text-red-500 py-4">
                                    We will not deliver to this location
                                </div>
                            )}
                            <button
                                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center space-x-2"
                                onClick={handleUseCurrentLocation}
                            >
                                <FaSearchLocation />
                                <span>Use My Current Location</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default AddressModal;
