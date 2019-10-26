import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, View, Text, AsyncStorage, Image, StyleSheet, Alert } from 'react-native';

import SpoList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.100:3333',{
                query: {user_id}
            })
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`);
            })
        })
    })

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpoList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20
    }

});