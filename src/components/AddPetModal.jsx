import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select, Textarea, useDisclosure } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { FormGroup, FormText, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPetModal = ({ addPet }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [image, setImage] = useState("")
    const [loading , setLoading] = useState(false)

    const upLoadImage = async (event) => {
        const files = event.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'Veterinary')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/dmioftmku/image/upload', {
            method: 'POST', 
            body: data,
        })
        const file = await res.json()
        console.log(res)
        setImage(file.secure_url)
        console.log(file.secure_url)
        setLoading(false)
    }

    const [overlay, setOverlay] = useState(
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const petData = {
            petName: formData.get('petName'),
            petAge: formData.get('petAge'),
            species: formData.get('species'),
            breed: formData.get('breed'),
            petSize: formData.get('petSize').toUpperCase(),
            specialTreatment: formData.get('specialTreatment'),
            image: image
        };
        try {
            const response = await axios.post('http://localhost:8080/api-veterinary/pets/new', petData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            addPet(petData); // This assumes addPet adds the pet to your local state or context
            Swal.fire({
                title: 'Success',
                text: 'Pet added successfully!',
                icon: 'success',
                confirmButtonText: 'Ok',
            });

        onClose();
    }

    return (
        <>
            <Button
                onClick={() => {
                    setOverlay(
                        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                    );
                    onOpen();
                }}
            >
                Add Pet
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Add New Pet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id="add-pet-form" onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel>Pet Name</FormLabel>
                                <Input name="petName" placeholder="Enter pet name" />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Pet Age</FormLabel>
                                <Input name="petAge" placeholder="Enter pet age" />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Species</FormLabel>
                                <Input name="species" placeholder="Enter species" />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Breed</FormLabel>
                                <Input name="breed" placeholder="Enter breed" />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Pet Size</FormLabel>
                                <Select name="petSize" placeholder="Select pet size">
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="Extra Large">Extra Large</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Special Treatment</FormLabel>
                                <Textarea name="specialTreatment" placeholder="Enter any special treatment" />
                            </FormControl>
                            <FormGroup>
                                <Label for="exampleFile">
                                    File
                                </Label>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    onChange={upLoadImage}
                                />
                                {loading ? (<h3>Uploadin Image...</h3>) : (<img src={image} style={{width: "300px"}}/>)}
                                <FormText>
                                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                                </FormText>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} form="add-pet-form" type="submit">
                            Add Pet
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddPetModal;