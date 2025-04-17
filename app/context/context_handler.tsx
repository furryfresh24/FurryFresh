import React from 'react';
import { SessionProvider } from '../context/sessions_context';
import { CartProvider } from '../context/cart_context';
import { PetProvider } from './pet_context';
import { CategoryProvider } from './category_context';
import { SubcategoryProvider } from './subcategory_context';
import { GroomingProvider } from './grooming_context';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CategoryProvider>
        <SubcategoryProvider>
          <GroomingProvider>
            <CartProvider>
              <PetProvider>
                {children}
              </PetProvider>
            </CartProvider>
          </GroomingProvider>
        </SubcategoryProvider>
      </CategoryProvider>
    </SessionProvider>
  );
};

export default Providers;
