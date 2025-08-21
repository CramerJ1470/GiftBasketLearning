
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Learning(){
  const [resources, setResources] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api('/api/learning', { token }).then(setResources).catch(console.error);
  }, []);

  return (
    <div className="grid" style={{ gap:'1rem' }}>
      {resources.map(r => (
        <div className="card" key={r._id}>
          <h3>{r.title}</h3>
          {r.description && <p>{r.description}</p>}
          {r.type === 'pdf' && (
            <a className="btn" href={r.url} target="_blank" rel="noreferrer">Open PDF</a>
          )}
          {r.type === 'video' && (
            <div style={{position:'relative',paddingTop:'56.25%'}}>
              <iframe
                src={r.url}
                title={r.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{position:'absolute', inset:0, width:'100%', height:'100%', border:'0'}}
              />
            </div>
          )}
        </div>
      ))}
      {!resources.length && <div className="card"><p>No learning resources yet.</p></div>}
    </div>
  );
}
