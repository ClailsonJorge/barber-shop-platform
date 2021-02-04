import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const { fieldName, registerField, error, defaultValue } = useField(name)
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    const handleFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
        setIsFocused(false)
        if (inputRef.current?.value) {
            setIsFilled(true)
        } else {
            setIsFilled(false)
        }
    }, [])

    return (
        <Container focus={isFocused} filled={isFilled}>
            {Icon && <Icon />}
            <input
                defaultValue={defaultValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                {...rest}
            />

            {error}
        </Container>
    )
}

export default Input
