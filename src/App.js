// import 'antd/dist/antd.min.css'; // miport this only where it is needed
import {StoreFunctions} from './useContexts/Store';
import { SelectedNFT } from './useContexts/SelectedNft'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar2 from './components/Navbar2'


function App() {
  return (
    <>
      <StoreFunctions>
        <SelectedNFT>

          <BrowserRouter>
            <Navbar2 />
            <Routes>
              <Route path="/" element={<div>Hello</div> } />
            </Routes>
          </BrowserRouter>

        </SelectedNFT>
      </StoreFunctions>
    </>
  );
}

export default App;
