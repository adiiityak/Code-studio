
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import {Toaster} from 'react-hot-toast';

function App() {
  return (  
    <>
      <div>
        <Toaster 
          position="top-right"
          toastOptions={{
            success:{
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#222',
                background: '#F89A24'
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#F89A24',
              },
            },
            error:{
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#222',
                background: '#F89A24'
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#F89A24',
              },
            },
          }}
        ></Toaster>
      </div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/editor/:roomId" element={<EditorPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
