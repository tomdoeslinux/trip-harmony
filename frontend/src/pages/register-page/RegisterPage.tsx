import { Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { API, User } from "src/api";
import { Link, useLocation } from "wouter";

const PAGE_WIDTH = '420px'

export default function RegisterPage() {
    const { register, handleSubmit } = useForm<User>()
    const [_, setLocation] = useLocation()

    async function createUser(user: User) {
        const createdUser: User = await API.createUser(user)
        await API.login(createdUser)

        setLocation('/')
    }

    return (
        <Flex flexDirection='column' background='gray.100' height='100vh'>
            <Flex height='100%' alignItems='center' justifyContent='center'>
                <Flex 
                    as='form' 
                    onSubmit={handleSubmit(createUser)} 
                    margin='32px' 
                    flexDirection='column'
                    width={PAGE_WIDTH}
                    gap='16px'
                >
                    <Heading as='h1' textAlign='center'>Register</Heading>

                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input background='white' {...register('username')} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' background='white' {...register('email')} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' background='white' {...register('password')} />
                    </FormControl>

                    <Button colorScheme='blue' type='submit'>Register</Button>
               
                    <Text textAlign='center'>Have an account? <Link href='/login' style={{ color: 'cornflowerblue' }}>Login</Link></Text>
                </Flex>
            </Flex>
        </Flex>
    )
}