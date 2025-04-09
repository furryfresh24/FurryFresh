import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import SupplySubcategory from '../../interfaces/suppy_subcategory';
import Product from '../../interfaces/product';
import MainContPaw from '../../components/general/background_paw';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import HorizontalButtonList from '../../components/list/horizontal_button_list';
import supabase from '../../utils/supabase';
import dimensions from '../../utils/sizing';
import Price from '../../components/general/price';
import Spacer from '../../components/general/spacer';

const LIMIT = 20;

const Shop = () => {
    const [supplySubcategories, setSupplySubcategories] = useState<SupplySubcategory[]>([]);
    const [subcategoryIds, setSubcategoryIds] = useState<string[]>([]);
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

    const fetchSupplySubcategories = async (): Promise<SupplySubcategory[]> => {
        const { data, error } = await supabase
            .from('supplies_subcategories')
            .select('*')
            .eq('supply_id', id); 
    
        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    
        const parsed = data?.map((item) => ({
            ...item,
            created_at: new Date(item.created_at),
            updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
        })) as SupplySubcategory[];
    
        return parsed;
    };
    

    const fetchMoreProducts = async (
        reset = false,
        id: string | number,
        subcategoryList: string[] = subcategoryIds
    ) => {
        console.log("Fetching products for:", id);
    
        // ❗ FIX: Use the `subcategoryList` instead of subcategoryIds state
        if (id === 'all' && (!subcategoryList || subcategoryList.length === 0)) {
            console.warn("No subcategory IDs loaded. Skipping fetch.");
            return;
        }
    
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
    
        if (id !== 'all') {
            query = query.eq('subcategory_id', id);
        } else {
            query = query.in('subcategory_id', subcategoryList); // ✅ using the passed-in list
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
        const init = async () => {
            const subcats = await fetchSupplySubcategories();
            if (subcats && subcats.length > 0) {
                const ids = subcats.map((item) => item.id);
    
                setSupplySubcategories(subcats);
                setSubcategoryIds(ids); 
    
                console.log("Subcategories loaded:", ids);
    
                await fetchMoreProducts(true, activeService, ids);
            } else {
                console.warn("No subcategories found. Skipping product fetch.");
            }
        };
    
        init();
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
                        setActiveService(id);
                        fetchMoreProducts(true, id);
                    }}
                    activeColor="#466AA2"
                    paddingHorizontal={dimensions.screenWidth * 0.06}
                />
                <Spacer height={dimensions.screenHeight * 0.02} />
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            router.push({
                                pathname: './prod_view',
                                params: {
                                    id: item.id,
                                    subcategory: (servicesWithAll.find((serv) => serv.id == item.subcategory_id)?.title ?? '')
                                }
                            })
                        }}>
                            <View style={styles.productCard}>
                                <View style={styles.productImageCont}>
                                    <Image
                                        source={{ uri: (item.product_images ?? [])[0] }}
                                        style={styles.productImage}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.productDetails}>
                                    <Text style={styles.productSubcategory}>
                                        {(servicesWithAll.find((serv) => serv.id == item.subcategory_id)?.title ?? '').toLocaleUpperCase()}
                                    </Text>
                                    <Text style={styles.productTitle} numberOfLines={2}>{item.name}</Text>
                                    <Price value={item.price} color='#808080' fontSize={dimensions.screenWidth * 0.035} />
                                </View>
                            </View>
                        </TouchableOpacity>
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
        shadowColor: '#808080',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        display: 'flex',
        flexDirection: 'row',
        elevation: 5,
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
        width: '100%',
        height: '100%',
        borderRadius: 10, 
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
