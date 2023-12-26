import { Button, Text, Flex, Input, InputGroup, InputProps, InputRightElement, Spinner } from "@chakra-ui/react"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

type AutocompleteProps = { 
    suggestions: string[],
    onSuggestionClick: (index: number) => void, 
    isLoading: boolean 
} & InputProps

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({ suggestions, isLoading, onSuggestionClick, ...props }, ref) => {
    const [suggestionsVisible, setSuggestionsVisible] = useState(true)
    
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => inputRef.current!, [])

    useEffect(() => {
        function documentMouseDownHandler(e: MouseEvent) {
            if (!(inputRef.current?.contains(e.target as HTMLElement) || suggestionsRef.current?.contains(e.target as HTMLElement))) {
                setSuggestionsVisible(false)
            }

            if (inputRef.current?.contains(e.target as HTMLElement)) {
                setSuggestionsVisible(true)
            }
        }

        if (suggestions.length === 0) {
            document.removeEventListener('mousedown', documentMouseDownHandler)
        } else {
            document.addEventListener('mousedown', documentMouseDownHandler)
        }

        return () => {
            document.removeEventListener('mousedown', documentMouseDownHandler)
        }
    }, [suggestions.length])

    return (
        <Flex flexDirection='column' width='100%'>
            <InputGroup>
                <Input {...props} ref={inputRef} />

                {isLoading && (
                    <InputRightElement>
                        <Spinner size='sm' />
                    </InputRightElement>
                )}
            </InputGroup>

            {suggestions.length > 0 && suggestionsVisible && (
                <Flex maxWidth='100%' position='relative' zIndex='999' ref={suggestionsRef}>
                    <Flex
                        marginTop='4px'
                        width='100%'
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
                                onClick={() => {
                                    onSuggestionClick(index)
                                    setSuggestionsVisible(false)
                                }}
                                key={index}
                            >
                                <Text
                                    textOverflow='ellipsis'
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                >
                                    {suggestion}
                                </Text>
                            </Button>
                        ))}
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
})

export default Autocomplete