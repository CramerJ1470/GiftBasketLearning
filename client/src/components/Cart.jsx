
import { useEffect, useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const [cart,setCart]=useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart')||'[]'))
  },[])

  function setQty(id, q){
    const c = cart.map(i => i._id===id ? {...i, quantity: Math.max(1, parseInt(q||1,10))} : i)
    setCart(c)
    localStorage.setItem('cart', JSON.stringify(c))
  }
  function remove(id){
    const c = cart.filter(i=>i._id!==id)
    setCart(c); localStorage.setItem('cart', JSON.stringify(c))
  }

  const total = cart.reduce((s,i)=> s + i.price*i.quantity, 0)

  async function placeOrder(){
    try{
      await api('/api/orders', {
        method:'POST',
        token,
        body: { items: cart.map(i => ({ productId: i._id, name: i.name, imageUrl: i.imageUrl, price: i.price, quantity: i.quantity })) }
      })
      localStorage.removeItem('cart')
      navigate('/success')
    }catch(err){
      alert(err.message)
    }
  }

  if(!cart.length) return <p>Your cart is empty.</p>

  return (
    <div className="card">
      <h2>Your Cart</h2>
      {cart.map(i => (
        <div key={i._id} className="row" style={{justifyContent:'space-between'}}>
          <div className="row" style={{gap:'.6rem'}}>
            <img src={i.imageUrl} alt={i.name} style={{width:80,height:60,objectFit:'cover',borderRadius:8}} />
            <div>
              <div><strong>{i.name}</strong></div>
              <div>${(i.price/100).toFixed(2)}</div>
            </div>
          </div>
          <div className="row">
            <input className="input" type="number" min="1" value={i.quantity} onChange={e=>setQty(i._id, e.target.value)} style={{width:80}}/>
            <button className="btn secondary" onClick={()=>remove(i._id)}>Remove</button>
          </div>
        </div>
      ))}
      <hr/>
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>Total</strong>
        <strong>${(total/100).toFixed(2)}</strong>
      </div>
      <div style={{textAlign:'right', marginTop:'.5rem'}}>
        <button className="btn" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  )
}
