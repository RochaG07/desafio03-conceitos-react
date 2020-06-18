import React from "react";
import api from "./services/api";

import "./styles.css";
import { useEffect, useState } from "react";


function App() {

  const [repositories, setRepositories] = useState([]);
  //const [repositories, setRepositories] = useState({});

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: "http://github.com/...",
      techs:[
        "Node.js",
        "..."
      ]
    });

    const repository = response.data;

    setRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
       
    setRepositories(repositories.filter(repo => repo.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
          repositories.map(repo => 
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
              </button>
            </li>)
          }
      </ul>

      <button type='button' onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
