
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Wholesaler from './components/Wholesaler.jsx'
import Admin from './components/Admin.jsx'
import Cart from './components/Cart.jsx'
import Orders from './components/Orders.jsx'
import Learning from './components/Learning.jsx'
import Clients from './components/Clients.jsx'

function Navbar() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  return (
    <div className="nav">
      <div className="container row" style={{justifyContent:'space-between'}}>
        <div className="row" style={{gap:'1rem'}}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          {token && role==='wholesaler' && (
            <>
              <Link to="/wholesaler">Shop</Link>
              <Link to="/wholesaler/orders">Orders</Link>
              <Link to="/wholesaler/learning">Learning</Link>
              <Link to="/wholesaler/clients">My Clients</Link>
            </>
          )}
          {token && <Link to="/cart">Cart</Link>}
          {token && role==='admin' && <Link to="/admin">Admin</Link>}
        </div>
        <div>
          {token ? <button className="btn secondary" onClick={()=>{localStorage.clear(); navigate('/')}}>Logout</button> : null}
        </div>
      </div>
    </div>
  )
}

function Protected({ children, roles }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (!token) return <Navigate to="/login" />
  if (roles && !roles.includes(role)) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wholesaler" element={<Protected roles={['wholesaler']}><Wholesaler /></Protected>} />
          <Route path="/wholesaler/orders" element={<Protected roles={['wholesaler']}><Orders /></Protected>} />
          <Route path="/wholesaler/learning" element={<Protected roles={['wholesaler']}><Learning /></Protected>} />
          <Route path="/wholesaler/clients" element={<Protected roles={['wholesaler']}><Clients /></Protected>} />
          <Route path="/admin" element={<Protected roles={['admin']}><Admin /></Protected>} />
          <Route path="/cart" element={<Protected roles={['wholesaler']}><Cart /></Protected>} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </>
  )
}

function Success(){
  return (
    <div className="card">
      <h2>Order placed! 🎉</h2>
      <p>Your order was recorded. We’ll follow up with invoice/shipping details.</p>
      <Link className="btn" to="/wholesaler">Back to Shop</Link>
    </div>
  )
}
