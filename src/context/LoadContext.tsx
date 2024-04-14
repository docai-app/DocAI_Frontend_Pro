// "use client"

import { createContext, useState } from 'react';

interface LoadModalProps {
    title?: string;
    show?: boolean;
    content?: string;
}

interface AlertContextProps extends LoadModalProps {
    setLoad: (props: LoadModalProps) => void;
}

const initialState = {
    title: '',
    show: false,
    onClose: (value: boolean) => { }
};

const LoadContext = createContext<AlertContextProps>({
    ...initialState,
    setLoad: (props: LoadModalProps) => { }
});

export const LoadProvider = ({ children }: any) => {
    const [props, setProps] = useState<LoadModalProps>({
        title: '',
        show: false
    });

    const setLoad = (props: LoadModalProps) => {
        setProps({ show: true, ...props });
    };

    return (
        <LoadContext.Provider
            value={{
                ...props,
                setLoad
            }}
        >
            {children}
        </LoadContext.Provider>
    );
};

export default LoadContext;
