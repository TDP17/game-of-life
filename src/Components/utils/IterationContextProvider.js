import React, { createContext, useState } from "react";

const IterationContext = createContext({
    iteration: 0,
    nextIteration: () => { }
});

export const IterationContextProvider = (props) => {
    const [iteration, setIteration] = useState(0);

    const nextIteration = () => {
        setIteration(i => (i + 1))
    }

    return (
        <IterationContext.Provider value={{ iteration: iteration, nextIteration: nextIteration }}>
            {props.children}
        </IterationContext.Provider>
    )
}

export default IterationContext;