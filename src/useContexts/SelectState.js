import { createContext, useState } from "react";

const SelectStateContext = createContext();

export const SelectState = (props) => {
    const [selectedNFT, setSelectedNFT] = useState();
    const [loading, setLoading] = useState(false);

    return (<SelectStateContext.Provider value={{ selectedNFT, setSelectedNFT, loading, setLoading }}>
        {props.children}
    </SelectStateContext.Provider>);
}

export default SelectStateContext;