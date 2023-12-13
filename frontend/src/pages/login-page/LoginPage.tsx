import { Flex, Text, Heading, Input, Button, FormLabel, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { API, LoginParam } from "src/api";
import { Link, useLocation } from "wouter";

const PAGE_WIDTH = '420px'

export default function LoginPage() {
    const { register, handleSubmit } = useForm<LoginParam>()
    const [_, setLocation] = useLocation()

    async function login(loginParam: LoginParam)  {
        await API.login(loginParam)
        setLocation('/')
    }

    return (
        <Flex flexDirection='column' background='gray.100' height='100vh'>
            <Flex height='100%' alignItems='center' justifyContent='center'>
                <Flex 
                    as='form' 
                    onSubmit={handleSubmit(login)} 
                    margin='32px' 
                    flexDirection='column'
                    width={PAGE_WIDTH}
                    gap='16px'
                >
                    <Heading as='h1' alignSelf='center'>Login</Heading>

                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input background='white' {...register('username')} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' background='white' {...register('password')} />
                    </FormControl>

                    <Button colorScheme='blue' type='submit'>Login</Button>

                    <Text textAlign='center'>Don't have an account? <Link href='/register' color='blue'>Register</Link></Text>
                </Flex>
            </Flex>
        </Flex>
    )
}