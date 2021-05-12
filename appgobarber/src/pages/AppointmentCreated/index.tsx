import { useNavigation, useRoute } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/Feather'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import React, { useCallback, useMemo } from 'react'

import {
    Container,
    Tittle,
    Description,
    OkButton,
    OkButtonText
} from './styles'

interface RouteParams {
    date: number
}

const AppointmentCreated: React.FC = () => {
    const { reset } = useNavigation()
    const { params } = useRoute()

    const routesParams = params as RouteParams

    const handleOkPressed = useCallback(() => {
        reset({
            routes: [{ name: 'Dashboard' }],
            index: 0
        })
    }, [reset])

    const formatedDate = useMemo(() => {
        return format(
            routesParams.date,
            "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
            { locale: ptBR }
        )
    }, [routesParams.date])

    return (
        <Container>
            <Icons name="check" size={80} color="04d361" />
            <Tittle>Agendamento</Tittle>

            <Description>{formatedDate}</Description>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>OK</OkButtonText>
            </OkButton>
        </Container>
    )
}

export default AppointmentCreated
