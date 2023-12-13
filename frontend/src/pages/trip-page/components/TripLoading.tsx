import { Flex, Spinner } from "@chakra-ui/react";

export default function TripLoading() {
    return (
        <Flex width='100vw' height='100vh' alignItems='center' justifyContent='center'>
            <Spinner />
        </Flex>
    )
}