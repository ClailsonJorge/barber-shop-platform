import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Feather'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
    ProvidersList,
    ProvidersListTitle,
    ProviderContainer,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText
} from './styles'


export interface Providers {
    id: string
    name: string
    avatar_url: string
}

const Dashboard: React.FC = () => {
    const [ providers, setProviders ] = useState<Providers[]>([])
    const { signOut, user } = useAuth()
    const { navigate } = useNavigation()

    const navigateToProfile = useCallback(() => {
        // navigate('Profile')
        signOut()
    }, [navigate])

    const navigateToCreateAppointment = useCallback((providerId: string) => {
        navigate('CreateAppointment')
    }, [navigate])

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data)
        })
    }, [])

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {"\n"}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url }} />
                </ProfileButton>
            </Header>

            <ProvidersList
                data={providers}
                ListHeaderComponent={
                    <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
                }
                renderItem={({ item: provider }) => (
                    <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
                        <ProviderAvatar source={{ uri: provider.avatar_url}} />

                        <ProviderInfo>
                            <ProviderName>{provider.name}</ProviderName>

                            <ProviderMeta>
                                <Icon name="calendar" size={14} color="#ff9000" />
                                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                            </ProviderMeta>

                            <ProviderMeta>
                                <Icon name="clock" size={14} color="#ff9000" />
                                <ProviderMetaText>8h às 18h</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
                keyExtractor={provider => provider.id}
            />
        </Container>
    )
}

export default Dashboard
