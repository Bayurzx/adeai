import { StoreFunctions } from './useContexts/Store';
import { SelectState } from './useContexts/SelectState'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './antd.min.css'

import Navbar from './components/Navbar'
import NewCollection from './components/NewCollection';
import UserCollection from './components/UserCollection';
import AllCollection from './components/AllCollection';
import NewNFT from './components/NewNFT';
import CollectionDetail from './components/CollectionDetail';
import AllNFTs from './components/AllNFTs';
import ListedNFTs from './components/ListedNFTs';
import OwnedNFTs from './components/OwnedNFTs';
import Footer from './components/Footer';
import Home from './components/Home';
import NotFound from './components/NotFound';
import NFTDetail from './components/NFTDetail';


function App() {
  return (
    <>
      <StoreFunctions>
        <SelectState>

          <BrowserRouter>
            <div className="mim_tm_all_wrap" data-magic-cursor data-color="crimson">


              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newcollection" element={<NewCollection />} />
                <Route path="/:contractAddress/:metaDataHash/:ownerAddress" element={<CollectionDetail />} />

                <Route path="/:contractAddress/:metaDataHash/:ownerAddress/mint" element={<NewNFT />} />

                <Route path="/usercollection" element={<UserCollection />} />
                <Route path="/allcollection" element={<AllCollection />} />
                
                <Route path="/allnfts" element={<AllNFTs />} />
                <Route path="/listednfts" element={<ListedNFTs />} />
                <Route path="/ownednfts" element={<OwnedNFTs />} />

                <Route exact path="/nftdetail" element={<NFTDetail />} />


                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>

        </SelectState>
      </StoreFunctions>
    </>
  );
}

export default App;
