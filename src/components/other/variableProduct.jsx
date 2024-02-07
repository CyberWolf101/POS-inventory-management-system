import { Add, DeleteOutline } from '@mui/icons-material';
import React, { useState } from 'react';
import { Fade } from 'react-reveal';
import swal from 'sweetalert';

function VariableProduct({
    variations,
    setVariations,
    variationPrices,
    setVariationPrices,
    variationAvailableQuantity,
    setVariationAvailableQuantity,
    convertedVariations,
    setConvertedVariations,
}) {
    const [newVariation, setNewVariation] = useState('');

    const handleAddVariation = () => {
        if (newVariation.trim() === '') {
            // Optionally, you can display an error message or prevent adding empty variations
            return;
        }

        // Split the comma-separated input into individual variations
        const newVariations = newVariation.split(',').map((v) => v.trim());

        // Ensure that variations is initialized as an array
        setVariations((prevVariations) => [...(prevVariations || []), ...newVariations]);

        // Update prices and available quantity states with default values (you can customize these)
        newVariations.forEach(() => {
            setVariationPrices((prevPrices) => [...(prevPrices || []), 0]);
            setVariationAvailableQuantity((prevQuantities) => [...(prevQuantities || []), 0]);
        });

        // Clear the input
        setNewVariation('');
    };

    const handleRemoveVariation = (index) => {
        // Remove the selected variation and its corresponding price and quantity
        setVariations((prevVariations) => prevVariations.filter((_, i) => i !== index));
        setVariationPrices((prevPrices) => prevPrices.filter((_, i) => i !== index));
        setVariationAvailableQuantity((prevQuantities) =>
            prevQuantities.filter((_, i) => i !== index)
        );
    };

    const handlePriceChange = (index, value) => {
        // Update the price for the specified variation
        setVariationPrices((prevPrices) => {
            const newPrices = [...(prevPrices || [])];
            newPrices[index] = value;
            return newPrices;
        });
    };

    const handleQuantityChange = (index, value) => {
        // Update the available quantity for the specified variation
        setVariationAvailableQuantity((prevQuantities) => {
            const newQuantities = [...(prevQuantities || [])];
            newQuantities[index] = value;
            return newQuantities;
        });
    };
    const handleConvertToArrayOfObjects = () => {
        if (variations && variationPrices && variationAvailableQuantity) {
            // Check if there are variations without prices or quantities
            const missingValues = variationPrices.concat(variationAvailableQuantity).some((value) => value === '');

            if (missingValues) {
                console.error("Some variations are missing prices or quantities.");
                swal("Some variations are missing prices or quantities.")
                return;
            }

            const variationsArray = variations;
            const pricesArray = variationPrices || [];
            const quantitiesArray = variationAvailableQuantity || [];

            const variationsObjects = variationsArray.map((variation, index) => ({
                variation,
                price: pricesArray[index],
                quantity: quantitiesArray[index],
            }));

            setConvertedVariations(variationsObjects);
        } else {
            console.error("Variations, prices, or quantities are undefined.");
        }
    };





    return (
        <div>
            <label>Variations:</label>
            <div className='flex'>
                <input
                    type='text'
                    className='form-control add-input'
                    placeholder='add variants'
                    value={newVariation}
                    onChange={(e) => setNewVariation(e.target.value)}
                />
                <button className='add-btn btn btn-custom' onClick={handleAddVariation}>
                    <Add />
                </button>
            </div>

            {variations && variations.length > 0 && (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <label>Set Prices and Quantities:</label>
                    {variations.map((variation, index) => (
                        <div key={index} className='grid-4-special my-2 '>
                            <Fade bottom>
                                <div>{variation}</div>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Price'
                                    value={(variationPrices || [])[index]}
                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                />
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Quantity'
                                    value={(variationAvailableQuantity || [])[index]}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                />
                                <button
                                    className='btn btn-danger btn-sm mx-1'
                                    onClick={() => handleRemoveVariation(index)}
                                >
                                    <DeleteOutline fontSize='small' />
                                </button>
                            </Fade>
                        </div>
                    ))}
                </div>
            )}

            {/* <div>
                <label>Comma Separated Variations:</label>
                <div>{variations ? variations.join(', ') : ''}</div>
            </div> */}
            <br />
            <button
                className='btn btn-outline-success btn-sm'
                onClick={handleConvertToArrayOfObjects}
                disabled={!variations || variations.length === 0}
            >
                SAVE VARIANTS
            </button>

            {convertedVariations && convertedVariations.length > 0 && (
                <div>
                    <label>saved Variations:</label>
                    {convertedVariations.map((obj, index) => (
                        <div key={index}>
                            {`${obj.variation} - Price: ${obj.price}, Quantity: ${obj.quantity}`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VariableProduct;
