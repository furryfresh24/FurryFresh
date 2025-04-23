import React from 'react';
import { SessionProvider } from '../context/sessions_context';
import { CartProvider } from '../context/cart_context';
import { PetProvider } from './pet_context';
import { CategoryProvider } from './category_context';
import { SubcategoryProvider } from './subcategory_context';
import { GroomingProvider } from './grooming_context';
import { BookingProvider } from './booking_context';
import { OrderProvider } from './order_context';
import { GlobalBookingProvider } from './global_booking_context';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CategoryProvider>
        <SubcategoryProvider>
          <GroomingProvider>
            <GlobalBookingProvider>
              <BookingProvider>
                <OrderProvider>
                  <CartProvider>
                    <PetProvider>
                      {children}
                    </PetProvider>
                  </CartProvider>
                </OrderProvider>
              </BookingProvider>
            </GlobalBookingProvider>
          </GroomingProvider>
        </SubcategoryProvider>
      </CategoryProvider>
    </SessionProvider>
  );
};

export default Providers;
