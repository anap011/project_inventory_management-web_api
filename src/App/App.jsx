import React, { useState, useEffect } from 'react';
import './App.css';
import { Nav } from 'rsuite';

const App = () => {
    const [data, setData] = useState([]);
    const [activeKey, setActiveKey] = useState("product");

    const fetchData = (endpoint) => {
        fetch(`https://www.api-inventory-management.somee.com/${endpoint}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData); // Asigna los datos recibidos al estado 'data'
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
                    Bienvenid@ a API Inventory Management
                </h2>
            </header>
            <section className='App-description'>
                <p>
                    Esta página web que he desarrollado utilizando React imprime en formato JSON los datos que obtiene de la conexión a una API-REST pública para métodos GET propia, la cual utiliza C# .NET.
                </p>
                <p>En el caso de que se quiera probar la API:
                    <br />
                    - Productos (Products): <a href="http://www.api-inventory-management.somee.com/product" target="_blank" rel="noopener noreferrer">http://www.api-inventory-management.somee.com/product</a>
                    <br />
                    - Proveedores (Suppliers): <a href="http://www.api-inventory-management.somee.com/supplier" target="_blank" rel="noopener noreferrer">http://www.api-inventory-management.somee.com/supplier</a>
                    <br />
                    - Lotes (Batches): <a href="http://www.api-inventory-management.somee.com/batch" target="_blank" rel="noopener noreferrer">http://www.api-inventory-management.somee.com/batch</a>
                    <br />
                    <br />
                    Si se quiere filtrar por "id": http://www.api-inventory-management.somee.com/NOMBRE_TABLA/id=NUMERO_ID" 
                </p>
            </section>

            <section className='App-nav'>
                <Nav justified appearance='default' ActiveKey={activeKey} onSelect={setActiveKey}>
                    <Nav.Item eventKey="Productos" onSelect={() => fetchData('product')} className="nav-item"> Productos (Products)</Nav.Item>
                    <Nav.Item eventKey="Proveedores" onSelect={() => fetchData('supplier')} className="nav-item">Proveedores (Suppliers)</Nav.Item>
                    <Nav.Item eventKey="Lotes" onSelect={() => fetchData('batch')} className="nav-item">Lotes (Batches)</Nav.Item>
                    {/*<Nav.Item eventKey="About" className="nav-item">About</Nav.Item> */}
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
