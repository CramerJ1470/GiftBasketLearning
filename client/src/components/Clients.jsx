
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Clients(){
  const token = localStorage.getItem('token');
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', notes:'' });
  const [editingId, setEditingId] = useState(null);

  function load(){
    api('/api/clients', { token }).then(setList).catch(console.error);
  }

  useEffect(() => { load(); }, []);

  function onChange(e){
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function save(e){
    e.preventDefault();
    if (!form.name.trim()) return alert('Name is required');
    if (editingId){
      await api(`/api/clients/${editingId}`, { method:'PUT', token, body: form });
    } else {
      await api('/api/clients', { method:'POST', token, body: form });
    }
    setForm({ name:'', email:'', phone:'', address:'', notes:'' });
    setEditingId(null);
    load();
  }

  async function edit(item){
    setForm({ name:item.name||'', email:item.email||'', phone:item.phone||'', address:item.address||'', notes:item.notes||'' });
    setEditingId(item._id);
  }

  async function del(id){
    if (!confirm('Delete this client?')) return;
    await api(`/api/clients/${id}`, { method:'DELETE', token });
    load();
  }

  return (
    <div className="grid" style={{ gap:'1rem' }}>
      <div className="card">
        <h2>{editingId ? 'Edit Client' : 'Add Client'}</h2>
        <form onSubmit={save} className="grid grid-2">
          <input className="input" name="name" placeholder="Name *" value={form.name} onChange={onChange} required />
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} />
          <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
          <input className="input" name="address" placeholder="Address" value={form.address} onChange={onChange} />
          <textarea className="input" name="notes" placeholder="Notes" value={form.notes} onChange={onChange} rows="3" />
          <div>
            <button className="btn">{editingId ? 'Update' : 'Save'}</button>
            {editingId && <button type="button" className="btn secondary" style={{marginLeft:8}} onClick={() => { setEditingId(null); setForm({ name:'', email:'', phone:'', address:'', notes:'' }); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>My Clients</h2>
        {!list.length && <p>No clients yet.</p>}
        {list.map(item => (
          <div key={item._id} className="row" style={{ justifyContent:'space-between' }}>
            <div>
              <strong>{item.name}</strong><br/>
              {item.email && <span>{item.email} · </span>}
              {item.phone && <span>{item.phone} · </span>}
              {item.address && <span>{item.address}</span>}
              {item.notes && <div style={{opacity:.8}}>{item.notes}</div>}
            </div>
            <div className="row" style={{gap:'.5rem'}}>
              <button className="btn secondary" onClick={()=>edit(item)}>Edit</button>
              <button className="btn secondary" onClick={()=>del(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
