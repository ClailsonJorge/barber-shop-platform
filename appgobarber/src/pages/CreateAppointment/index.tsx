import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerText
} from './styles'
import { Platform } from 'react-native'

interface RouteParams {
    providerId: string
}

export interface Providers {
    id: string
    name: string
    avatar_url: string
}

const CreateAppointment: React.FC = () => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [ providers, setProviders ] = useState<Providers[]>([])
    const route = useRoute()
    const { user } = useAuth()
    const routeParams = route.params as RouteParams
    const { goBack } = useNavigation()

    const [ selectedProvider, setSelectedProvider ] = useState(routeParams.providerId)

    const navigateBack = useCallback(() => {
        goBack()
    }, [])

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId)
    }, [])

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker(state => !state)
    }, [])

    const handleDateChange = useCallback((event: any, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false)
        }

        if (date) {
            setSelectedDate(date)
        }
    }, [])

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data)
        })
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

            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider.id}
                    renderItem={({ item: provider })=>(
                        <ProviderContainer
                            onPress={() => handleSelectProvider(provider.id)}
                            selected={provider.id === selectedProvider}
                        >
                            <ProviderAvatar source={{ uri: provider.avatar_url}}/>
                            <ProviderName
                                selected={provider.id === selectedProvider}
                            >{provider.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
            <Calendar>
                <Title>Escolha a data</Title>

                <OpenDatePickerButton onPress={handleToggleDatePicker}>
                    <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
                </OpenDatePickerButton>

                {showDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="calendar"
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                )}
            </Calendar>
        </Container>
    )
}

export default CreateAppointment
