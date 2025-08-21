
import { useState } from 'react'
import { api } from '../api'

export default function Register(){
  const [role, setRole] = useState('wholesaler')
  const [form, setForm] = useState({
    companyName:'',
    fullName:'',
    loginName:'',
    email:'',
    phoneNumber:'',
    billingAddress:'',
    shippingAddress:'',
    address:'',
    password:'',
    confirmPassword:''
  })
  const [msg,setMsg]=useState('')

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  async function submit(e){
    e.preventDefault()
    if (form.password !== form.confirmPassword) return setMsg('Passwords do not match')
    const payload = {
      role,
      fullName: form.fullName,
      loginName: form.loginName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      ...(role==='wholesaler' ? {
        companyName: form.companyName || '—',
        billingAddress: form.billingAddress,
        shippingAddress: form.shippingAddress,
      } : {
        address: form.address,
      })
    }
    try{
      await api('/api/auth/register', { method:'POST', body: payload })
      setMsg('Registered! You can now log in.')
    }catch(err){
      setMsg(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Create an account</h2>
      <div className="row" style={{gap:'.5rem'}}>
        <button className={`btn ${role==='wholesaler'?'':'secondary'}`} onClick={()=>setRole('wholesaler')}>Wholesaler</button>
        <button className={`btn ${role==='admin'?'':'secondary'}`} onClick={()=>setRole('admin')}>Admin</button>
      </div>

      <form onSubmit={submit} className="grid grid-2" style={{marginTop:'1rem'}}>
        <input className="input" name="fullName" placeholder="Full Name" onChange={onChange} required />
        <input className="input" name="loginName" placeholder="Login Name" onChange={onChange} required />
        <input className="input" type="email" name="email" placeholder="Email" onChange={onChange} required />
        <input className="input" name="phoneNumber" placeholder="Phone Number" onChange={onChange} />

        {role==='wholesaler' ? (
          <>
            <input className="input" name="companyName" placeholder="Company Name" onChange={onChange} required />
            <input className="input" name="billingAddress" placeholder="Billing Address" onChange={onChange} />
            <input className="input" name="shippingAddress" placeholder="Shipping Address" onChange={onChange} />
          </>
        ) : (
          <input className="input" name="address" placeholder="Address" onChange={onChange} />
        )}

        <input className="input" type="password" name="password" placeholder="Password" onChange={onChange} required />
        <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={onChange} required />

        <div>
          <button className="btn">Register</button>
        </div>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
