import { createContext, useState } from "react";

const SelectedNftContext = createContext();

export const SelectedNFT = (props) => {
    const [selectedNFT, setSelectedNFT] = useState();
    const [loading, setLoading] = useState(false);

    return (<SelectedNftContext.Provider value={{ selectedNFT, setSelectedNFT, loading, setLoading }}>
        {props.children}
    </SelectedNftContext.Provider>);
}

export default SelectedNftContext;