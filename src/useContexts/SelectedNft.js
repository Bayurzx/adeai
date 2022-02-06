import { createContext, useState } from "react";

const SelectedNftContext = createContext();

export const SelectedNFT = (props) => {
    const [selectedNFT, setSelectedNFT] = useState();
    return (<SelectedNftContext.Provider value={{ selectedNFT, setSelectedNFT }}>
        {props.children}
    </SelectedNftContext.Provider>);
}

export default SelectedNftContext;