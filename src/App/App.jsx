import React, { useState, useEffect } from 'react';
import './App.css';
import { Nav } from 'rsuite';

const App = () => {
    const [data, setData] = useState([]);
    const [activeKey, setActiveKey] = useState("product");

    const fetchData = (endpoint) => {
        fetch(`https://www.api-inventory-management.somee.com/v1/${endpoint}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData); 
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData('product');
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    ¡Bienvenido a la API de Control de Inventario!
                </h2>
            </header>
            <section className='App-description'>
                <p>
                    Esta página web, desarrollada con React, permite visualizar datos en formato JSON obtenidos de una API REST pública. La API, construida con C# y .NET, está diseñada para ofrecer métodos GET para la gestión de inventarios.
                </p>
                <p>En el caso de que se quiera ver la API:
                    <br />
                    - Productos : <a href="https://www.api-inventory-management.somee.com/v1/productos" target="_blank" rel="noopener noreferrer">https://www.api-inventory-management.somee.com/productos</a>
                    <br />
                    - Proveedores : <a href="https://www.api-inventory-management.somee.com/v1/proveedores" target="_blank" rel="noopener noreferrer">https://www.api-inventory-management.somee.com/v1/proveedores</a>
                    <br />
                    - Lotes : <a href="https://www.api-inventory-management.somee.com/v1/lotes" target="_blank" rel="noopener noreferrer">https://www.api-inventory-management.somee.com/v1/lotes</a>
                    <br />
                    <br />
                    Si se quiere filtrar por "id": http://www.api-inventory-management.somee.com/v1/NOMBRE_TABLA/NUMERO_ID" 
                </p>
            </section>

            <section className='App-nav'>
                <Nav justified appearance='default' ActiveKey={activeKey} onSelect={setActiveKey}>
                    <Nav.Item eventKey="Productos" onSelect={() => fetchData('productos')} className="nav-item"> Productos</Nav.Item>
                    <Nav.Item eventKey="Proveedores" onSelect={() => fetchData('proveedores')} className="nav-item">Proveedores </Nav.Item>
                    <Nav.Item eventKey="Lotes" onSelect={() => fetchData('lotes')} className="nav-item">Lotes</Nav.Item>
                </Nav>
            </section>
            
            <div className='App-content'>
                <div className='App-json'>
                    <pre>{JSON.stringify(data, null, 5)}</pre>
                </div>
            </div>
        </div>
    );
}

export default App;
