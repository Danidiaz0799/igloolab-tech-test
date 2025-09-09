import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Modal
} from 'react-native';
import { ProductCard } from './ProductCard';
import { ConnectionStatusBanner } from './ConnectionStatusBanner';
import { ProductForm } from './ProductForm';
import { Product } from '../types/product';
import { productService } from '../services';

export const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const loadProducts = useCallback(async () => {
        try {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
        } catch (error) {
        console.error('Error al cargar productos:', error);
        } finally {
        setLoading(false);
        }
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    }, [loadProducts]);

    const handleProductDeleted = useCallback(() => {
        loadProducts();
    }, [loadProducts]);

    const handleProductCreated = useCallback(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const renderProduct = ({ item }: { item: Product }) => (
        <ProductCard
        product={item}
        onDelete={handleProductDeleted}
        />
    );

    const renderHeader = () => (
        <View style={styles.headerContainer}>
        <View style={styles.header}>
            <Text style={styles.title}>🛍️ Productos</Text>
            <Text style={styles.subtitle}>
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
            </Text>

            <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar productos..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            </View>

            <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}
            >
            <Text style={styles.addButtonText}>➕ Agregar Producto</Text>
            </TouchableOpacity>
        </View>

        <ConnectionStatusBanner />
        </View>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyTitle}>No hay productos</Text>
        <Text style={styles.emptySubtitle}>
            {searchQuery ? 'No se encontraron productos con ese término' : 'Agrega tu primer producto tocando el botón de arriba'}
        </Text>
        </View>
    );

    const renderLoading = () => (
        <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>⏳ Cargando productos...</Text>
        </View>
    );

    if (loading) {
        return (
        <View style={styles.container}>
            {renderHeader()}
            {renderLoading()}
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmpty}
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2196F3']}
                tintColor="#2196F3"
            />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />

        <Modal
            visible={showForm}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <ProductForm
            onProductCreated={handleProductCreated}
            onClose={() => setShowForm(false)}
            />
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    listContainer: {
        paddingBottom: 20,
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 8,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 4,
    },
    addButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
    },
});
