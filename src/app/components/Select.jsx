import React from "react";

const Select = ({ variants, selectedVariant, setSelectedVariant }) => {
    const units = variants.map((variant) => ({
        id: variant?.id,
        name: variant?.name,
    }));
    const handleChange = (e) => {
        const selectedUnit = variants.find(
            (variant) => variant.name === e.target.value
        );
        setSelectedVariant(selectedUnit);
    };
    return (
        <select
            name="quantity"
            id="quantity"
            onChange={handleChange}
            value={selectedVariant?.name || ""}
            className="border-2 border-gray-300 bg-white focus:outline-none "
        >
            {units.map((unit) => (
                <option key={unit.id} value={unit.name}>
                    {unit.name}
                </option>
            ))}
        </select>
    );
};

export default Select;
