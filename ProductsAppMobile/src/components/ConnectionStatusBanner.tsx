import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { productService, ConnectionStatus } from '../services';

export const ConnectionStatusBanner: React.FC = () => {
    const [status, setStatus] = useState<ConnectionStatus>('loading');

    useEffect(() => {
        const unsubscribe = productService.onStatusChange(setStatus);
        setStatus(productService.getConnectionStatus());
        return unsubscribe;
    }, []);

    const getStatusInfo = () => {
        switch (status) {
        case 'api':
            return {
            text: '🌐 Conectado a la API',
            color: '#4CAF50',
            backgroundColor: '#E8F5E8'
            };
        case 'dummy':
            return {
            text: '📱 Usando datos locales',
            color: '#FF9800',
            backgroundColor: '#FFF3E0'
            };
        case 'loading':
            return {
            text: '⏳ Conectando...',
            color: '#2196F3',
            backgroundColor: '#E3F2FD'
            };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <View style={[styles.container, { backgroundColor: statusInfo.backgroundColor }]}>
        <Text style={[styles.text, { color: statusInfo.color }]}>
            {statusInfo.text}
        </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 8,
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
});
