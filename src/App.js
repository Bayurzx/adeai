// import 'antd/dist/antd.min.css'; // miport this only where it is needed
import { StoreFunctions } from './useContexts/Store';
import { SelectedNFT } from './useContexts/SelectedNft'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './antd.css'

import Navbar from './components/Navbar'
import NewCollection from './components/NewCollection';


function App() {
  return (
    <>
      <StoreFunctions>
        <SelectedNFT>

          <BrowserRouter>
            <div className="mim_tm_all_wrap" data-magic-cursor data-color="crimson">


              <Navbar />
              <Routes>
                <Route path="/" element={<div><br /> <br /> Hello</div>} />
                <Route path="/newcollection" element={<NewCollection /> } />
              </Routes>
            </div>
          </BrowserRouter>

        </SelectedNFT>
      </StoreFunctions>
    </>
  );
}

export default App;
