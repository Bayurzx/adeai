import { createContext, useState } from "react";

const SelectedNftContext = createContext();

export const UseSelectedNFT = (props) => {
    const [selectedNFT, setSelectedNFT] = useState();
    return (<SelectedNftContext.Provider value={{ selectedNFT, setSelectedNFT }}>
        {props.children}
    </SelectedNftContext.Provider>);
}

export default SelectedNftContext;