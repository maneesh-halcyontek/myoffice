import { useState, useEffect } from 'react';
const Home = () => {
const [message, setMessage] = useState('') ;    

useEffect(() => {
    fetch('http://localhost:5700/')
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error('Error fetching data:', error));

},[]);
return (
    <div>
        <h1>Home Page - Home</h1>
        <p>{message}</p>
    </div>
)
};
export default Home;