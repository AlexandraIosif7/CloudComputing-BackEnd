import { VStack, Box, Heading, Center, ListItem, Divider, HStack, Text, Input, Button, UnorderedList, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";


function Informations() {
    const [routes, setRoutes] = useState([]);
    const [SpecificRoutes, setSpecificRoutes] = useState([]);

    const locationRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `${process.env.REACT_APP_API_URL}locations/all`,
            );
            // const result = await axios.get(
            //     `http://localhost:8080/locations/all`,
            // );


            if (result.data) {
                let locationsArray = result.data;
                locationsArray.reverse();
                setRoutes(result.data);
                //console.log(result.data)
            }
        };

        fetchData();
    }, []);

    async function deleteRoute(id) {
        await axios.delete(`${process.env.REACT_APP_API_URL}locations/delete/${id}`)
            .then((res) => {
                if (res.data !== null) {
                    //alert("Route deleted!");
                    window.location.reload(false);
                }
            });
    }

    async function searchForLocation(place) {
        if (locationRef.current.value === "") {
            return;
        }

        const result = await axios.get(
            `${process.env.REACT_APP_API_URL}locations/${place}`,
        );

        if (result.data) {
            let locationsArray = result.data;
            locationsArray.reverse();
            setSpecificRoutes(result.data);
            //console.log(result.data)
        }

    };


    return (

        <VStack w="full" h="full" alignItems="flex-start" >
            <Box
                p={4}
                borderRadius="lg"
                mt={4}
                bgColor="white"
                shadow="base"
                minW="container.md"
                zIndex="1"
            >
                <Center><Heading>My Routes Collection</Heading> </Center>
                <Center><Text mb={4} color='gray.500'> Here you will find all the routes you saved: </Text></Center>

                <UnorderedList>
                    {routes.length ? routes.map(route =>
                        <ListItem key={route.id}>
                            <HStack spacing={4} mt={4} justifyContent="space-between">
                                <Text>Origin: {route.origin} </Text>
                                <Text>Destination: {route.destination} </Text>
                                <Text>Distance: {route.distance} </Text>
                                <Text>Duration: {route.duration} </Text>
                                <IconButton colorScheme="red" icon={<FaTimes />} type="submit" onClick={() => deleteRoute(route.id)}></IconButton>
                            </HStack>
                        </ListItem>

                    )
                        : <Text> No routes yet</Text>
                    }
                    <Divider mt={4} orientation='horizontal' />
                </UnorderedList>
                <HStack spacing={4} mt={4} justifyContent="space-between">
                    <Center><Text mb={4} color='gray.500'> Search for a specific location: </Text></Center>
                    <Input type="text" placeholder="Location" ref={locationRef} />
                    <Button colorScheme="pink" type="submit" onClick={() => searchForLocation(locationRef.current.value)} >
                        Search
                    </Button>
                </HStack>
                <UnorderedList>
                    {SpecificRoutes.length ? SpecificRoutes.map(route =>
                        <ListItem key={route.id}>
                            <HStack spacing={4} mt={4} justifyContent="space-between">
                                <Text>Origin: {route.origin} </Text>
                                <Text>Destination: {route.destination} </Text>
                                <Text>Distance: {route.distance} </Text>
                                <Text>Duration: {route.duration} </Text>
                                <IconButton colorScheme="red" icon={<FaTimes />} type="submit" onClick={() => deleteRoute(route.id)}></IconButton>
                            </HStack>
                        </ListItem>

                    )
                        : <Text> No routes yet</Text>
                    }

                </UnorderedList>


            </Box>

        </VStack>

    );
}

export default Informations;