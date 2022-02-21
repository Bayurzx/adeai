// *****************************
// *****  DO   NOT   USE  ******
// *****************************

import { createContext, useState } from "react";

const CollectionStateContext = createContext();


export const CollectionState = (props) => {
  const [userCollections, setUserCollections] = useState({});
  const [allCollections, setAllCollections] = useState({});

  const [numCollection, setNumCollection] = useState(0);
  const [totalNumCollection, setTotalNumCollection] = useState(0);

  // console.log("totalNumCollection: ", totalNumCollection);
  // console.log("allCollections: ", allCollections);

  return (
    <CollectionStateContext.Provider
      value={{
        userCollections,
        allCollections,
        numCollection,
        totalNumCollection,
        setUserCollections,
        setAllCollections,
        setNumCollection,
        setTotalNumCollection,
      }}
    >
      {props.children}
    </CollectionStateContext.Provider>
  );
};

export default CollectionStateContext;