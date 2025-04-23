import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import ReviewRating from '../interfaces/review_rating';
import { useSession } from './sessions_context';

interface ReviewRatingsContextType {
    ratings: ReviewRating[];
    loading: boolean;
    error: string | null;
    fetchRatings: () => void;
    addRatingContext: (rating: ReviewRating) => void;
    updateRatingContext: (updatedRating: ReviewRating) => void;
    clearRatings: () => void;
}

interface ReviewRatingsProviderProps {
    children: React.ReactNode;
}

const ReviewRatingsContext = createContext<ReviewRatingsContextType | undefined>(undefined);

export const ReviewRatingsProvider: React.FC<ReviewRatingsProviderProps> = ({ children }) => {
    const { session } = useSession();
    const [ratings, setRatings] = useState<ReviewRating[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRatings = async () => {
        if (!session?.user?.id) {
            setError('User not logged in.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error: fetchError } = await supabase
                .from('review_ratings')
                .select('*')
                .eq('user_id', session.user.id);

            if (fetchError) throw fetchError;

            const parsed = data?.map((item) => ({
                ...item,
                created_at: new Date(item.created_at).toISOString(),
                updated_at: item.updated_at ? new Date(item.updated_at).toISOString() : undefined
            })) as ReviewRating[];


            setRatings(parsed);
        } catch (err) {
            setError('Failed to fetch review ratings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addRatingContext = (rating: ReviewRating) => {
        setRatings((prev) => [...prev, rating]);
    };

    const updateRatingContext = (updatedRating: ReviewRating) => {
        setRatings((prevRatings) =>
            prevRatings.map((item) =>
                item.id === updatedRating.id ? { ...item, ...updatedRating } : item
            )
        );
    };

    const clearRatings = () => {
        setRatings([]);
    };

    useEffect(() => {
        if (session?.user?.id) {
            fetchRatings();
        }
    }, [session]);

    return (
        <ReviewRatingsContext.Provider
            value={{
                ratings,
                loading,
                error,
                fetchRatings,
                addRatingContext,
                updateRatingContext,
                clearRatings
            }}
        >
            {children}
        </ReviewRatingsContext.Provider>
    );
};

export const useReviewRatings = (): ReviewRatingsContextType => {
    const context = useContext(ReviewRatingsContext);
    if (!context) {
        throw new Error('useReviewRatings must be used within a ReviewRatingsProvider');
    }
    return context;
};
