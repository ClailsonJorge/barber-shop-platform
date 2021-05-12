import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'

import { Platform, Alert } from 'react-native'
import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    Content,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerText,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText
} from './styles'

interface RouteParams {
    providerId: string
}

export interface Providers {
    id: string
    name: string
    avatar_url: string
}

interface AvailableDate {
    hour: number
    available: boolean
}

const CreateAppointment: React.FC = () => {
    const [availability, setAvailability] = useState<AvailableDate[]>([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedHour, setSelectedHour] = useState(0)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [providers, setProviders] = useState<Providers[]>([])
    const route = useRoute()
    const { user } = useAuth()
    const routeParams = route.params as RouteParams
    const { goBack, navigate } = useNavigation()

    const [selectedProvider, setSelectedProvider] = useState(
        routeParams.providerId
    )

    const navigateBack = useCallback(() => {
        goBack()
    }, [goBack])

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId)
    }, [])

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker(state => !state)
    }, [])

    const handleDateChange = useCallback((_, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false)
        }

        if (date) {
            setSelectedDate(date)
        }
    }, [])

    const handleSelecHour = useCallback((hour: number) => {
        setSelectedHour(hour)
    }, [])

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate)

            date.setHours(selectedHour)
            date.setMinutes(0)

            await api.post('/appointments', {
                provider_id: selectedProvider,
                date
            })

            navigate('AppointmentCreated', { date: date.getTime() })
        } catch (error) {
            Alert.alert('Erro ao agendar nessa data.')
        }
    }, [selectedDate, selectedHour, selectedProvider, navigate])

    const morningAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour < 12)
            .map(({ hour, available }) => {
                return {
                    hour,
                    hourFormated: format(new Date().setHours(hour), 'HH:00'),
                    available
                }
            })
    }, [availability])

    const afternoonAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour >= 12)
            .map(({ hour, available }) => {
                return {
                    hour,
                    hourFormated: format(new Date().setHours(hour), 'HH:00'),
                    available
                }
            })
    }, [availability])

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data)
        })
    }, [])

    useEffect(() => {
        api.get(`/providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(response => {
            setAvailability(response.data)
        })
    }, [selectedDate, selectedProvider])

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={14} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <Content>
                <ProvidersListContainer>
                    <ProvidersList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={providers}
                        keyExtractor={provider => provider.id}
                        renderItem={({ item: provider }) => (
                            <ProviderContainer
                                onPress={() =>
                                    handleSelectProvider(provider.id)
                                }
                                selected={provider.id === selectedProvider}
                            >
                                <ProviderAvatar
                                    source={{ uri: provider.avatar_url }}
                                />
                                <ProviderName
                                    selected={provider.id === selectedProvider}
                                >
                                    {provider.name}
                                </ProviderName>
                            </ProviderContainer>
                        )}
                    />
                </ProvidersListContainer>
                <Calendar>
                    <Title>Escolha a data</Title>

                    <OpenDatePickerButton onPress={handleToggleDatePicker}>
                        <OpenDatePickerText>
                            Selecionar outra data
                        </OpenDatePickerText>
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

                <Schedule>
                    <Title>Escolha o horário</Title>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent>
                            {morningAvailability.map(
                                ({ hourFormated, available, hour }) => (
                                    <Hour
                                        enabled={available}
                                        selected={selectedHour === hour}
                                        available={available}
                                        key={hourFormated}
                                        onPress={() => handleSelecHour(hour)}
                                    >
                                        <HourText
                                            selected={selectedHour === hour}
                                        >
                                            {hourFormated}
                                        </HourText>
                                    </Hour>
                                )
                            )}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            {afternoonAvailability.map(
                                ({ hourFormated, available, hour }) => (
                                    <Hour
                                        enabled={available}
                                        selected={selectedHour === hour}
                                        available={available}
                                        key={hourFormated}
                                        onPress={() => handleSelecHour(hour)}
                                    >
                                        <HourText
                                            selected={selectedHour === hour}
                                        >
                                            {hourFormated}
                                        </HourText>
                                    </Hour>
                                )
                            )}
                        </SectionContent>
                    </Section>
                </Schedule>

                <CreateAppointmentButton onPress={handleCreateAppointment}>
                    <CreateAppointmentButtonText>
                        Agendar
                    </CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    )
}

export default CreateAppointment
