import { Flex, Button } from "@chakra-ui/react"
import { HEADER_HEIGHT, PAGE_WIDTH } from "src/pages/home-page/HomePage"
import { User } from "src/pages/register-page/RegisterPage"

interface HeaderProps {
    user: User
}

export default function Header(props: HeaderProps) {
    return (
        <Flex
            background='white'
            width='100%'
            height={HEADER_HEIGHT}
            position='fixed'
            shadow='md'
        >
            <Flex width='100%' justifyContent='center' alignItems='center'>
                <Flex margin='32px' width={PAGE_WIDTH} fontSize='2xl'>
                    TripHarmony ({props.user.username})

                    <Button marginLeft='auto' onClick={() => {
                        localStorage.removeItem('cur_user')
                        location.reload()
                    }}>Log Out</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
