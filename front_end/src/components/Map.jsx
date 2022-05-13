import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    IconButton,
    Input,
    Text,
    SkeletonText,
    VStack,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";


const centerOfMap = { lat: 44.448, lng: 26.0991 };
function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */(null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    const originRef = useRef();
    const desinationRef = useRef();

    if (!isLoaded) {
        return <SkeletonText />;
    }

    async function calculateRoute() {
        if (originRef.current.value === "" || desinationRef.current.value === "") {
            return;
        }

        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: desinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    function clearRoute() {
        setDirectionsResponse(null);
        setDistance("");
        setDuration("");
        originRef.current.value = "";
        desinationRef.current.value = "";
    }

    return (
        <VStack w="full" h="full" alignItems="flex-start">
            <Box
                p={4}
                borderRadius="lg"
                mt={4}
                bgColor="white"
                shadow="base"
                minW="container.md"
                zIndex="1"
            >
                <HStack spacing={4} justifyContent="space-between">
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input type="text" placeholder="Origin" ref={originRef} />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input
                                type="text"
                                placeholder="Destination"
                                ref={desinationRef}
                            />
                        </Autocomplete>
                    </Box>
                    <ButtonGroup>
                        <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                            Calculate Route
                        </Button>
                        <IconButton
                            aria-label="center back"
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
                </HStack>

                <HStack spacing={4} mt={4} justifyContent="space-between">
                    <Text>Distance: {distance} </Text>
                    <Text>Duration: {duration} </Text>
                    <IconButton
                        aria-label="center back"
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => map.panTo(centerOfMap)}
                    />
                </HStack>
            </Box>

            <Box h="100%" w="100%">
                {/* Google Map Box */}
                <GoogleMap
                    center={centerOfMap}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{ fullscreenControl: false }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={centerOfMap}> </Marker>
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
        </VStack>
    );
}

export default Map;