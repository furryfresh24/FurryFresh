import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import SupplySubcategory from '../../interfaces/suppy_subcategory';
import Product from '../../interfaces/product';
import MainContPaw from '../../components/general/background_paw';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import HorizontalButtonList from '../../components/list/horizontal_button_list';
import supabase from '../../utils/supabase';
import dimensions from '../../utils/sizing';
import Price from '../../components/general/price';
import Spacer from '../../components/general/spacer';

const LIMIT = 20;

const Shop = () => {
    const [supplySubcategories, setSupplySubcategories] = useState<SupplySubcategory[]>([]);
    const [activeService, setActiveService] = useState<number | string>('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const fetchIdRef = useRef(0);

    const { title, id } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        if (typeof title === 'string') {
            // @ts-ignore
            navigation.setParams({ title });
        }
    }, [title]);

    const fetchSupplySubcategories = async () => {
        const { data, error } = await supabase
            .from('supplies_subcategories')
            .select('*')
            .eq('supply_id', id);

        if (error) {
            console.error('Error fetching categories:', error);
            return;
        }

        const parsed = data?.map((item) => ({
            ...item,
            created_at: new Date(item.created_at),
            updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
        })) as SupplySubcategory[];

        setSupplySubcategories(parsed);
    };

    const fetchMoreProducts = async (reset = false, id: string | number) => {
        console.log("Fetching");

        if (reset) {
            setIsLoading(true);
            setHasMore(true);
            setProducts([]);
        }

        const offset = reset ? 0 : products.length;

        let query = supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .range(offset, offset + LIMIT - 1);

        // Only filter by subcategory_id if activeService is not 'all'
        if (id !== 'all') {
            query = query.eq('subcategory_id', id);
        }

        try {
            const { data, error } = await query;

            if (error) {
                console.error('Fetch error:', error);
                return;
            }

            const parsed = data?.map((item) => ({
                ...item,
                created_at: new Date(item.created_at),
                updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
            })) as Product[];

            if (reset) {
                setProducts(parsed);
            } else {
                setProducts((prev) => [...prev, ...parsed]);
            }

            setHasMore(parsed.length === LIMIT);
        } catch (err) {
            console.error('Unexpected error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSupplySubcategories();
        fetchMoreProducts(true, activeService);
    }, []);

    const servicesFromSubcategories = supplySubcategories.map((subcat) => ({
        id: subcat.id,
        title: subcat.name,
    }));

    const servicesWithAll = [{ id: 'all', title: 'All' }, ...servicesFromSubcategories];

    return (
        <MainContPaw allowScroll={false}> 
            <View>
                <HorizontalButtonList
                    services={servicesWithAll}
                    activeService={activeService}
                    setActiveService={(id) => {
                        setActiveService(id);  // Update activeService state
                        fetchMoreProducts(true, id);  // Fetch products for the selected service
                    }}
                    activeColor="#466AA2"
                    paddingHorizontal={dimensions.screenWidth * 0.06}
                />
                <Spacer height={dimensions.screenHeight * 0.02}/>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <View style={styles.productImageCont}>
                                <Image
                                    source={{ uri: (item.product_images ?? [])[0] }} // Display the first image
                                    style={styles.productImage} // Adjust styles as needed
                                    resizeMode="cover" // Adjust the image display mode
                                />
                            </View>
                            <View style={styles.productDetails}>
                                <Text style={styles.productSubcategory}>{(servicesWithAll.filter((serv) => serv.id == item.subcategory_id)[0].title ?? '').toLocaleUpperCase()}</Text>
                                <Text style={styles.productTitle}>{item.name}</Text>
                                <Price value={item.price} color='#808080' fontSize={dimensions.screenWidth * 0.035}/>
                            </View>
                        </View>
                    )}
                    onEndReached={() => products.length > LIMIT ? fetchMoreProducts(false, activeService) : null}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoading ? <Text style={{ textAlign: 'center' }}>Loading more...</Text> : null
                    }
                />
            </View>
        </MainContPaw>
    );
};

export default Shop;

const styles = StyleSheet.create({
    productCard: {
        padding: 16,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        display: 'flex',
        flexDirection: 'row',
        elevation: 3,
    },
    productImageCont: {
        width: dimensions.screenWidth * 0.25,
        backgroundColor: '#fafbfc',
        height: dimensions.screenWidth * 0.25,
        overflow: 'hidden',
        borderRadius: 10,
        marginRight: dimensions.screenWidth * 0.035
    },
    productImage: {
        width: '100%', // The image will take the full width of the container
        height: '100%', // The image will take the full height of the container
        borderRadius: 10, // Optional, to match the container's rounded corners
    },
    productDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    productTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: dimensions.screenWidth * 0.035
    },
    productSubcategory: {
        fontFamily: 'Poppins-Regular',
        color: '#808080',
        fontSize: dimensions.screenWidth * 0.03
    }
});
