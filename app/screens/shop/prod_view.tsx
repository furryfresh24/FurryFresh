import { Animated, FlatList, StyleSheet, Text, View, Image, ViewToken, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import MainContPlain from '../../components/general/background_plain';
import Product from '../../interfaces/product';
import supabase from '../../utils/supabase';
import Paginator from '../onboarding/paginator';
import dimensions from '../../utils/sizing';
import Price from '../../components/general/price';
import { Ionicons } from '@expo/vector-icons';
import StarRatings from '../../components/general/ratings';
import Subtitle1 from '../../components/texts/subtitle1';
import Details from './partials/details';
import Button1 from '../../components/buttons/button1';
import { LinearGradient } from 'expo-linear-gradient';
import AppbarDefault from '../../components/bars/appbar_default';
import { Session } from '@supabase/supabase-js';

const ProductView = () => {
  const navigation = useNavigation();
  const [session, setSession] = useState<Session | null>(null);
  const { id, subcategory } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMenuIndex, setCurrentMenuIndex] = useState<string>('1');
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState<number>(3.5);

  const fetchProduct = async (id: string) => {
    setIsLoading(true);

    let query = supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    try {
      const { data, error } = await query;

      if (error) {
        console.error('Fetch error:', error);
        return;
      }

      const parsed = {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
      } as Product;

      console.log(parsed);

      setProduct(parsed);
    } catch (err) {
      console.error('Unexpected error fetching product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (id) {
      fetchProduct(Array.isArray(id) ? id[0] : id);
    }
  }, [id]);

  const photoSlides = product?.product_images || [];

  const menus = [
    {
      id: '1',
      title: 'Details',
    },
    {
      id: '2',
      title: 'Reviews',
    },
    {
      id: '3',
      title: 'FAQs',
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppbarDefault
          title={subcategory as string}
          session={session}
          showLeading={true}
          leadingChildren={(
            <View style={{ flex: 1, justifyContent: 'flex-end', display: 'flex', alignItems: 'flex-end' }}>
              <Ionicons name='heart' size={dimensions.screenWidth * 0.07} color="#ED7964" />
            </View>
          )}
          titleSize={dimensions.screenWidth * 0.045}
        />
      ),
    });
  }, [navigation, session]);

  const addToCart = () => {
    return (
      <View style={styles.addToCart}>
        <LinearGradient
          colors={['#FFFFFF', 'transparent']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientBackground}
        >
          <Button1
            isPrimary={true}
            title="Add to Cart"
            onPress={() => { }}
            customStyle={styles.addToCartButton}
          />
        </LinearGradient>
      </View>
    );
  }

  return (
    <MainContPlain floatingComponent={addToCart()} floatingPosition={{ bottom: 0, left: 0, right: 0 }}>
      <View style={styles.productImageCont}>
        <FlatList
          ref={flatListRef}
          data={photoSlides}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: dimensions.screenWidth * 0.6, height: dimensions.screenWidth * 0.6 }}
              resizeMode="cover"
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onViewableItemsChanged={viewableItemsChanged}
        />
        <Paginator data={photoSlides} scrollX={scrollX} />
      </View>
      <View style={styles.productDetailsCont}>
        <View style={styles.productFirstRow}>
          <Text style={styles.productSubcategory}>{(subcategory as string).toLocaleUpperCase()}</Text>
        </View>
        <View style={styles.productSecondRow}>
          <Text numberOfLines={3} style={styles.productName}>{product?.name}</Text>
          <Price
            value={product?.price ?? 0}
            currencySize={dimensions.screenWidth * 0.04}
            fontSize={dimensions.screenWidth * 0.05}
            fontFamily='Poppins-SemiBold'
          />
        </View>
        <View style={styles.productThirdRow}>
          <View style={styles.starsPlacement}>
            <StarRatings ratings={ratings} />
          </View>
          <Subtitle1 text={ratings + '/5.0'} fontSize={dimensions.screenWidth * 0.035} lineHeight={dimensions.screenWidth * 0.05} fontFamily='Poppins-Regular' />
        </View>
        <View style={styles.productFourthRow}>
          <FlatList
            data={menus}
            scrollEnabled={false}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCurrentMenuIndex(item.id)}>
                <View>
                  <Text style={[styles.menu, {
                    color: currentMenuIndex == item.id ? '#466AA2' : '#808080',
                    fontFamily: currentMenuIndex == item.id ? 'Poppins-SemiBold' : 'Poppins-Regular',
                    borderBottomWidth: currentMenuIndex == item.id ? 3 : 0,
                    borderBottomColor: '#466AA2'
                  }]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.productFifthRow}>
          {currentMenuIndex == '1' ?
            (
              <Details details={product?.description ?? ''} />
            ) : currentMenuIndex == '2' ? (
              <></>
            ) : (
              <></>
            )
          }
        </View>
      </View>
    </MainContPlain>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  productImageCont: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dimensions.screenHeight * 0.02,
    marginVertical: dimensions.screenHeight * 0.02,
  },
  productDetailsCont: {
    backgroundColor: 'white',
    flex: 1,
  },
  productFirstRow: {
    paddingTop: dimensions.screenHeight * 0.015,
    paddingHorizontal: dimensions.screenWidth * 0.06
  },
  productSecondRow: {
    paddingTop: dimensions.screenHeight * 0.005,
    paddingHorizontal: dimensions.screenWidth * 0.06,
    display: 'flex',
    flexDirection: 'row'
  },
  productThirdRow: {
    paddingHorizontal: dimensions.screenWidth * 0.06,
    marginBottom: dimensions.screenHeight * 0.02,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  productFourthRow: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#808080'
  },
  productSubcategory: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: dimensions.screenWidth * 0.05,
    flex: 1,
    marginRight: dimensions.screenWidth * 0.015,
  },
  menu: {
    marginHorizontal: dimensions.screenWidth * 0.06,
    fontFamily: 'Poppins-Regular',
    fontSize: dimensions.screenWidth * 0.038,
    paddingVertical: dimensions.screenHeight * 0.005,
    marginRight: dimensions.screenWidth * 0.1
  },
  starsPlacement: {
    display: 'flex',
    flexDirection: 'row',
    gap: dimensions.screenWidth * 0.01,
    marginRight: dimensions.screenWidth * 0.02
  },
  productFifthRow: {
    paddingBottom: dimensions.screenHeight * 0.1
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: dimensions.screenHeight * 0.05,  // Adjust based on preference
  },
  addToCartButton: {
    backgroundColor: '#466AA2',
    paddingVertical: dimensions.screenHeight * 0.018,
    paddingHorizontal: dimensions.screenWidth * 0.3,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontSize: dimensions.screenWidth * 0.045,
    fontFamily: 'Poppins-SemiBold',
  },
  addToCart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: dimensions.screenHeight * 0.04,
    paddingTop: dimensions.screenHeight * 0.02
  },
});
