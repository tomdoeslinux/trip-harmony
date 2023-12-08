import { Flex, Text, Heading, Input, Button, useMediaQuery } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { User } from "src/pages/register-page/RegisterPage";
import { Link, useLocation } from "wouter";

interface LoginParam {
    username: string
    password: string
}

const PAGE_WIDTH = '420px'

export default function LoginPage() {
    const [isWide] = useMediaQuery(`(min-width: ${PAGE_WIDTH})`)
    const { register, handleSubmit } = useForm<LoginParam>()
    const [_, setLocation] = useLocation()

    async function login(loginParam: LoginParam)  {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginParam)
        })

        const loggedInUser: User = await response.json()
        localStorage.setItem('cur_user', JSON.stringify(loggedInUser))

        setLocation('/')
    }

    return (
        <Flex
            flexDirection='column'
            background='gray.100'
            height='100vh'
        >
            <Flex height='100%' alignItems='center' justifyContent='center'>
                <Flex as='form' onSubmit={handleSubmit((loginParam) => login(loginParam))} margin='32px' flexDirection='column' width={isWide ? PAGE_WIDTH : '100%'}>
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