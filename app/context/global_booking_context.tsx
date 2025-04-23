import React, { createContext, useContext, useEffect, useState } from "react";
import { Booking } from "../interfaces/booking";
import supabase from "../utils/supabase";

interface GlobalBookingContextType {
  globalBookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchGlobalBookings: () => void;
  updateGlobalBookingContext: (updatedBooking: Booking) => void;
}

interface GlobalBookingProviderProps {
  children: React.ReactNode;
}

const GlobalBookingContext = createContext<GlobalBookingContextType | undefined>(undefined);

export const GlobalBookingProvider: React.FC<GlobalBookingProviderProps> = ({ children }) => {
  const [globalBookings, setGlobalBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGlobalBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*");

      if (error) throw error;
      setGlobalBookings(data as Booking[]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch global bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateGlobalBookingContext = (updatedBooking: Booking) => {
    setGlobalBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
  };

  useEffect(() => {
    fetchGlobalBookings();
  }, []);

  return (
    <GlobalBookingContext.Provider
      value={{ globalBookings, loading, error, fetchGlobalBookings, updateGlobalBookingContext }}
    >
      {children}
    </GlobalBookingContext.Provider>
  );
};

export const useGlobalBooking = (): GlobalBookingContextType => {
  const context = useContext(GlobalBookingContext);
  if (!context) {
    throw new Error("useGlobalBooking must be used within a GlobalBookingProvider");
  }
  return context;
};
