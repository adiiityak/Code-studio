
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
                border: '1px solid #5271FF',
                padding: '16px',
                color: '#fff',
                background: '#5271FF'
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#5271FF',
              },
            },
            error:{
              style: {
                border: '1px solid #5271FF',
                padding: '16px',
                color: '#fff',
                background: '#5271FF'
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#5271FF',
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
