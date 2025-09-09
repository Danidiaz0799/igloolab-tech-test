import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { productService } from '../services';

interface ProductFormProps {
    onProductCreated: () => void;
    onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.description.trim() || !formData.price.trim()) {
        Alert.alert('Error', 'Todos los campos son requeridos');
        return;
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
        Alert.alert('Error', 'El precio debe ser un número mayor a 0');
        return;
        }

        try {
        setLoading(true);
        await productService.createProduct({
            name: formData.name,
            description: formData.description,
            price: price,
        });

        Alert.alert('Éxito', 'Producto creado exitosamente', [
            {
            text: 'OK',
            onPress: () => {
                setFormData({ name: '', description: '', price: '' });
                onProductCreated();
                onClose();
            },
            },
        ]);
        } catch (error) {
        Alert.alert('Error', error instanceof Error ? error.message : 'Error al crear producto');
        } finally {
        setLoading(false);
        }
    };

    const formatPriceInput = (text: string) => {
        // Remover caracteres no numéricos excepto puntos
        const cleaned = text.replace(/[^0-9.]/g, '');
        setFormData({ ...formData, price: cleaned });
    };

    const getFormattedPreview = () => {
        const price = parseFloat(formData.price);
        if (!isNaN(price) && price > 0) {
        return productService.formatPrice(price);
        }
        return '';
    };

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
            <Text style={styles.title}>➕ Nuevo Producto</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.form}>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Nombre del producto *</Text>
                <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Ej: Laptop Gaming Asus ROG"
                placeholderTextColor="#999"
                maxLength={100}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Descripción *</Text>
                <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Describe las características del producto..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Precio (COP) *</Text>
                <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={formatPriceInput}
                placeholder="Ej: 2500000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                />
                {getFormattedPreview() && (
                <Text style={styles.pricePreview}>
                    Vista previa: {getFormattedPreview()}
                </Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
                disabled={loading}
                >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.button, styles.submitButton, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
                >
                <Text style={styles.submitButtonText}>
                    {loading ? 'Creando...' : 'Crear Producto'}
                </Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    form: {
        padding: 16,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        color: '#333',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    pricePreview: {
        fontSize: 14,
        color: '#2196F3',
        marginTop: 4,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#2196F3',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});
