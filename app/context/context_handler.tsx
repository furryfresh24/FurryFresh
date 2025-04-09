import React from 'react';
import { SessionProvider } from '../context/sessions_context';
import { CartProvider } from '../context/cart_context';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CartProvider>
          {children}
      </CartProvider>
    </SessionProvider>
  );
};

export default Providers;
