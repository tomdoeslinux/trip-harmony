import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";
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
        <Flex
            flexDirection='column'
            background='gray.100'
            height='100vh'
        >
            <Flex height='100%' alignItems='center' justifyContent='center'>
                <Flex 
                    as='form' 
                    onSubmit={handleSubmit(login)} 
                    margin='32px' 
                    flexDirection='column'
                    width={PAGE_WIDTH}
                >
                    <Heading as='h1' alignSelf='center'>Login</Heading>
                    <Text marginTop='16px'>Username</Text>
                    <Input marginTop='4px' background='white' {...register('username')} />

                    <Text marginTop='16px'>Password</Text>
                    <Input type='password' marginTop='4px' background='white' {...register('password')} />

                    <Button marginTop='16px' colorScheme='blue' type='submit'>Login</Button>

                    <Text marginTop='16px' textAlign='center'>Don't have an account? <Link href='/register' color='blue'>Register</Link></Text>
                </Flex>
            </Flex>
        </Flex>
    )
}