import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import dotenv from 'dotenv';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { loadStripe } from '@stripe/stripe-js';

dotenv.config();
const STRIPE_PUB_KEY = process.env.REACT_APP_STRIPE_PUB_KEY || '';


const AppContext = React.createContext();

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState();

  const { isError } = useQuery('validateToken', apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
