import { Cancel } from '@mui/icons-material';
import React from 'react';

function SelectedFile({ selectedImages, setFile, setSelectedImages }) {
    return (
        <div>
            <div className='grid-3'>
                {selectedImages.map((selectedImage, index) => (
                    <div key={index} className={`message  `} style={{ position: 'relative', opacity: '0.8' }}>
                        <img
                            src={selectedImage}
                            alt={`Selected ${index + 1}`}
                            style={{ opacity: 0.9, height: '100px', borderRadius: '4px' }}
                        />
                        <div
                            onClick={() => {
                                setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((_, i) => i !== index));
                                setFile((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Clear the image file as well if needed
                            }}
                            style={{ position: 'absolute', top: '0', width: 'auto', color:'aliceblue'}}
                            // className='txt-success'
                        >
                            <Cancel fontSize='small' />
                        </div>
                        <br />
                    </div>
                ))}

            </div>
        </div>
    );
}

export default SelectedFile;