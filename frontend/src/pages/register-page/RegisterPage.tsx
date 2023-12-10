import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
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
        <Flex 
            flexDirection='column' 
            background='gray.100' 
            height='100vh'
        >
            <Flex height='100%' alignItems='center' justifyContent='center'>
                <Flex 
                    as='form' 
                    onSubmit={handleSubmit((user) => createUser(user))} 
                    margin='32px' 
                    flexDirection='column'
                    width={PAGE_WIDTH}
                >
                    <Heading as='h1' textAlign='center'>Register</Heading>
                    <Text marginTop='16px'>Username</Text>
                    <Input marginTop='4px' background='white' {...register('username')} />

                    <Text marginTop='16px'>Email</Text>
                    <Input marginTop='4px' type='email' background='white' {...register('email')} />

                    <Text marginTop='16px'>Password</Text>
                    <Input type='password' marginTop='4px' background='white' {...register('password')} />

                    <Button marginTop='16px' colorScheme='blue' type='submit'>Register</Button>
               
                    <Text marginTop='16px' textAlign='center'>Have an account? <Link href='/login' color='blue'>Login</Link></Text>
                </Flex>
            </Flex>
        </Flex>
    )
}