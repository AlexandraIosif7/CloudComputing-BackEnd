import { Flex } from "@chakra-ui/react";
import Informations from "./components/Informations";
import Map from "./components/Map";

function App() {

  return (
    <Flex h="100vh" w="100vw" bg="pink">
      <Map />
      <Informations />
    </Flex>
  );
}

export default App;
