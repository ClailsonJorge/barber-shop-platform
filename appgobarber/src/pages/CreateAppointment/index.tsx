import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth'

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar
} from './styles'

interface RouteParams {
    provider_id: string
}

const CreateAppointment: React.FC = () => {
    // const route = useRoute()
    const { user } = useAuth()
    // const { provider_id } = route.params as RouteParams
    const { goBack } = useNavigation()

    const navigateBack = useCallback(() => {
        goBack()
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={14} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url}}/>
            </Header>
        </Container>
    )
}

export default CreateAppointment
