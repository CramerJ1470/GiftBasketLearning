
import { useEffect, useState } from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom'

export default function Wholesaler(){
  const [products,setProducts]=useState([])
  const [qty,setQty]=useState({})

  useEffect(()=>{
    api('/api/products').then(setProducts).catch(console.error)
  },[])

  function addToCart(p){
    const quantity = parseInt(qty[p._id] || 1, 10)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i._id === p._id)
    if (existing) existing.quantity += quantity
    else cart.push({ ...p, quantity })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <div className="grid grid-2">
      {products.map(p=>(
        <div className="card" key={p._id}>
          <img src={p.imageUrl} alt={p.name} />
          <h3>{p.name} <span className="badge">${(p.price/100).toFixed(2)}</span></h3>
          <p>{p.description}</p>
          <div className="row">
            <input className="input" type="number" min="1" value={qty[p._id] || 1} onChange={e=>setQty({...qty, [p._id]: e.target.value})}/>
            <button className="btn" onClick={()=>addToCart(p)}>Add to cart</button>
          </div>
        </div>
      ))}
      <div style={{gridColumn:'1/-1', textAlign:'right'}}>
        <Link className="btn" to="/cart">Proceed to cart</Link>
      </div>
    </div>
  )
}
