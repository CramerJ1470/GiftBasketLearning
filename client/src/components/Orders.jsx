
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api('/api/orders/mine', { token }).then(setOrders).catch(console.error);
  }, []);

  if (!orders.length) return <div className="card"><p>No orders yet.</p></div>;

  return (
    <div className="card">
      <h2>My Order History</h2>
      <table className="table">
        <thead>
          <tr><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.items.reduce((s,i)=>s+i.quantity,0)}</td>
              <td>${(o.total/100).toFixed(2)}</td>
              <td><span className="badge">{o.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
