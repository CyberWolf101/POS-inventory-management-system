import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';

function CalculatorModal(props) {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const handleCalculate = () => {
        try {
            setResult(eval(input).toString());
        } catch (error) {
            setResult('Error');
        }
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleBackspace = () => {
        setInput((prevInput) => prevInput.slice(0, -1));
    };

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader>
                            <h6>CALCULATOR</h6>
                        </ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody>
                        <center>
                            <div className="text-center straight" >
                                <input
                                    type='text'
                                    value={input}
                                    readOnly
                                    style={{ width: '60%', marginBottom: '5px' }}
                                    className='form-control text-success'
                                />
                            </div>
                            <br />
                            <div className='straight'>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('1')}>1</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('2')}>2</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('3')}>3</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('+')}>+</Button>
                            </div>
                            <div className='straight'>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('4')}>4</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('5')}>5</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('6')}>6</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('-')}>-</Button>
                            </div>
                            <div className='straight'>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('7')}>7</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('8')}>8</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('9')}>9</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('*')}>*</Button>
                            </div>
                            <div className='straight'>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('0')}>0</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={handleClear}>C</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={handleCalculate}>=</Button>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={() => handleButtonClick('/')}>/</Button>
                            </div>
                            <div className='straight'>
                                <Button colorScheme='green' className='mx-1 my-1' onClick={handleBackspace}>⌫</Button>
                            </div>
                            <br />

                            <div className="text-center straight"  >
                                <div
                                    style={{ width: '60%', marginBottom: '5px' }}

                                    className='form-control text-success fw-bold'
                                >
                                    {Number(result) > 0 && Number(result)?.toLocaleString()}
                                </div>
                            </div>
                            <br />
                        </center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default CalculatorModal;
