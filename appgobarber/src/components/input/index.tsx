import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'
import {Container, InputText, Icon } from './styles'

interface InputProps extends TextInputProps {
    name: string
    icon: string
}

interface InputValueReference {
    value: string
}

interface InputRef {
    focus(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
    const inputElementRef = useRef<any>(null)
    const { registerField, fieldName, error, defaultValue = ''} = useField(name)
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue })
    const [isFocus, setIsFocus] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus()
        }
    }))

    useEffect(()=>{
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value
                inputElementRef.current.setNativeProps({ text: value})
            },
            clearValue() {
                inputValueRef.current.value = ''
                inputElementRef.current.clear()
            }
        })
    }, [fieldName, registerField])

    const handleFocus = useCallback(() => {
        setIsFocus(true)
    }, [])

    const handleBlur = useCallback(() => {
        setIsFocus(false)

        setIsFilled(!!inputValueRef.current.value)
    }, [])

    return (
        <Container isFocus={isFocus} isError={!!error}>
            <Icon
             name={icon}
             size={20}
             color={isFocus || isFilled ? "#FF9000" : "#666360"}
            />
            <InputText
             ref={inputElementRef}
             placeholderTextColor="#666360"
             defaultValue={defaultValue}
             onChangeText={(value) => {inputValueRef.current.value = value}}
             {...rest}
             onFocus={handleFocus}
             onBlur={handleBlur}
            />
        </Container>
    )
}

export default forwardRef(Input)
