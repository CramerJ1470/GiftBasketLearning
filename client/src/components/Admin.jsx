
import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Admin(){
  const token = localStorage.getItem('token')
  const [orders,setOrders]=useState([])
  const [users,setUsers]=useState({admins:[],wholesalers:[]})

  useEffect(()=>{
    api('/api/orders', { token }).then(setOrders).catch(console.error)
    api('/api/auth/users', { token }).then(setUsers).catch(console.error)
  },[])

  return (
    <div className="grid" style={{gap:'1rem'}}>
      <div className="card">
        <h2>Recent Orders</h2>
        <table className="table">
          <thead><tr><th>Date</th><th>User</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map(o=>(
              <tr key={o._id}>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>{o.role} ({o.userId})</td>
                <td>{o.items.reduce((s,i)=> s + i.quantity, 0)}</td>
                <td>${(o.total/100).toFixed(2)}</td>
                <td><span className="badge">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Users</h2>
        <div className="grid grid-2">
          <div>
            <h3>Admins</h3>
            <ul>
              {users.admins.map(u=> <li key={u._id}>{u.fullName} — {u.email}</li>)}
            </ul>
          </div>
          <div>
            <h3>Wholesalers</h3>
            <ul>
              {users.wholesalers.map(u=> <li key={u._id}>{u.companyName} / {u.fullName} — {u.email}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
