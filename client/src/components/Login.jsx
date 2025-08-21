
import { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ loginName:'', password:'', confirmPassword:'' })
  const [msg,setMsg]=useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  async function submit(e){
    e.preventDefault()
    if (form.password !== form.confirmPassword) return setMsg('Passwords do not match')
    try{
      const data = await api('/api/auth/login', { method:'POST', body:{ loginName: form.loginName, password: form.password } })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('name', data.name)
      navigate(data.role === 'admin' ? '/admin' : '/wholesaler')
    }catch(err){
      setMsg(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit} className="grid grid-2">
        <input className="input" name="loginName" placeholder="Login Name" onChange={onChange} required />
        <input className="input" type="password" name="password" placeholder="Password" onChange={onChange} required />
        <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={onChange} required />
        <div><button className="btn">Login</button></div>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
