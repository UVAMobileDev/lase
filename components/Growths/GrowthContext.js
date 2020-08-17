import React from 'react';

const GrowthContext = React.createContext();

export const GrowthProvider = GrowthContext.Provider;
export const GrowthConsumer = GrowthContext.Consumer;

export default GrowthContext;
