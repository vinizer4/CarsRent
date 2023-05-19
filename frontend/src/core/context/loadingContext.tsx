import React, {createContext, useContext, useState} from "react";
import Loadgif from '../assets/Loadgif';

interface ILoadingContext {
    loading: boolean;
    toggleLoading: (e: boolean) => void;
}

export const defaultState = {
    loading: false,
};

export const LoadingContext = createContext<Partial<ILoadingContext>>(defaultState);


export const LoadingProvider = ({children}: { children: any }) => {
    const [loading, setLoading] = useState(defaultState.loading);

    const toggleLoading = (e: boolean) => {
        setLoading(e);
    };

    return (
        <LoadingContext.Provider
            value={{
                loading,
                toggleLoading,
            }}
        >
            {children}
            {loading && (<>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.29)',
                        zIndex: 999999,
                        width: '100vw',
                        height: '100vh',
                        top: 0,
                        position: 'absolute'
                    }}
                    onClick={() => toggleLoading(false)}
                >
                    <Loadgif width={'300px'} height={'300px'}/>
                </div>
            </>)}
        </LoadingContext.Provider>
    );
};
export const useLoadingContext = () => useContext(LoadingContext);
