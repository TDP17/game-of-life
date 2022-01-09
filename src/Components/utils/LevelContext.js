import React, { createContext, useState } from "react";

const LevelContext = createContext({
    level: 0,
    nextLevel: () => {}
});

export const LevelContextProvider = (props) => {
    const [level, setLevel] = useState(0);

    const nextLevel = () => {
        setLevel(lvl => (lvl + 1))
    }

    return (
        <LevelContext.Provider value={{ level: level, nextLevel: nextLevel }}>
            {props.children}
        </LevelContext.Provider>
    )
}

export default LevelContext;