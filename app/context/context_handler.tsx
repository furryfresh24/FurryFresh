import React from 'react';
import { SessionProvider } from '../context/sessions_context';
import { CartProvider } from '../context/cart_context';
import { PetProvider } from './pet_context';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CartProvider>
        <PetProvider>
          {children}
        </PetProvider>
      </CartProvider>
    </SessionProvider>
  );
};

export default Providers;
