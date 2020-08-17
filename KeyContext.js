import React from 'react';

const KeyContext = React.createContext();

export const KeyProvider = KeyContext.Provider;
export const KeyConsumer = KeyContext.Consumer;

export default KeyContext;
