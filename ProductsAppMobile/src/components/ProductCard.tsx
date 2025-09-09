import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Product } from '../types/product';
import { productService } from '../services';

interface ProductCardProps {
    product: Product;
    onPress?: () => void;
    onDelete?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, onDelete }) => {
    const handleDelete = () => {
        Alert.alert(
        'Confirmar eliminación',
        `¿Estás seguro de que deseas eliminar "${product.name}"?`,
        [
            { text: 'Cancelar', style: 'cancel' },
            {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
                try {
                await productService.deleteProduct(product.id);
                onDelete?.();
                } catch (error) {
                Alert.alert('Error', 'No se pudo eliminar el producto');
                }
            },
            },
        ]
        );
    };

    return (
        <Pressable 
        style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed
        ]}
        onPress={onPress}
        >
        <View style={styles.header}>
            <Text style={styles.name} numberOfLines={2}>
            {product.name}
            </Text>
            <Text style={styles.price}>
            {productService.formatPrice(product.price)}
            </Text>
        </View>
        
        <Text style={styles.description} numberOfLines={3}>
            {product.description}
        </Text>
        
        <View style={styles.footer}>
            <View style={styles.leftFooter}>
            <Text style={styles.id}>ID: #{product.id}</Text>
            {product.created_at && (
                <Text style={styles.date}>
                {new Date(product.created_at).toLocaleDateString('es-CO')}
                </Text>
            )}
            </View>
            
            <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>🗑️</Text>
            </Pressable>
        </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        flex: 1,
        marginRight: 12,
        lineHeight: 24,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2196F3',
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    description: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftFooter: {
        flex: 1,
    },
    id: {
        fontSize: 12,
        color: '#999999',
        fontWeight: '500',
    },
    date: {
        fontSize: 12,
        color: '#999999',
        marginTop: 2,
    },
    deleteButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#ffebee',
    },
    deleteButtonText: {
        fontSize: 16,
    },
});
