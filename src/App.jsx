import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProductListing from './components/ProductListing'; 
import ProductDetails from './components/ProductDetails'; 
import NewProductForm from './components/NewProductForm';
import EditProduct from './components/EditProduct';

function App() {

  return (
    <>

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/add-product" element={<NewProductForm />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
        {/* Redirect unknown routes back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  )
}

export default App
