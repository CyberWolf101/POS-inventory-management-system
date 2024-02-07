import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
} from '@chakra-ui/react'
import { Store } from '@mui/icons-material';
function StoreStatisticsModal({ isOpen, onClose, clickedStore }) {
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader>
                            <h6></h6>
                        </ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody>
                        <center>
                            <Avatar src={clickedStore.storeLogo} icon={<Store/>}/>
                            <br />
                            <small className='faint'>{clickedStore.storeName} statistics</small>
                            <br />
                            <br />
                        </center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default StoreStatisticsModal;