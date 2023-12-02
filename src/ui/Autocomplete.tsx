import { Button, Flex, Input, InputProps } from "@chakra-ui/react"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

type AutocompleteProps = { suggestions: string[], onOutsideClick: () => void } & InputProps

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({ suggestions, onOutsideClick, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => inputRef.current!, [])

    useEffect(() => {
        function documentClickHandler(e: MouseEvent) {
            if (!(inputRef.current?.contains(e.target as HTMLElement) || suggestionsRef.current?.contains(e.target as HTMLElement))) {
                onOutsideClick()
            }
        }

        if (suggestions.length === 0) {
            document.removeEventListener('click', documentClickHandler)
        } else {
            document.addEventListener('click', documentClickHandler)
        }

        return () => {
            document.removeEventListener('click', documentClickHandler)
        }
    }, [])

    return (
        <Flex flexDirection='column' width='100%' gap='8px'>
            <Input {...props} ref={inputRef} />

            {suggestions.length > 0 && (
                <Flex position='relative' zIndex='999' ref={suggestionsRef}>
                    <Flex 
                        flexDirection='column' 
                        border='1px solid'
                        borderColor='gray.200'
                        shadow='md'
                        background='white'
                        borderRadius='md'
                        overflow='clip'
                        position='absolute'
                    >
                        {suggestions.map((suggestion, index) => (
                            <Button 
                                padding='8px' 
                                justifyContent='flex-start'
                                variant='ghost'
                                borderRadius='0px'
                                fontWeight='normal'
                                key={index}
                            >{suggestion}</Button>
                        ))}
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
})

export default Autocomplete