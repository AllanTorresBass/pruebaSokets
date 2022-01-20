import { useState} from "react";
import io from "socket.io-client";
import './App.css';
 
const socket = io.connect("http://localhost:3001");
socket.on('connection')
function App() {
  
  let [radio, setRadio] = useState("");
  let [input, setInput] = useState("");
  let [showData, setshowData] = useState(
    {
      id:'', 
      orig:'', 
      destination:'', 
      weight:'', 
      price:'', 
      description:''
     }
    );
  socket.on("message",(data)=>{
    setshowData(data)
})
       
      const sendMessage = () =>{
 
       socket.emit('message',input);

    }
    function handleInput(e) {
  
      setInput({...input,[e.target.name]: e.target.value });
     
    }
    function handleRadio(e) {
  
      setRadio({[e.target.name]: e.target.value });
     
    }
  
  
  
  return (
    <div className="App">
      
         <h1>Prueba de Sockets React #1</h1>
       <p>Tipo de usuario  {radio.tipo}<br/>
       <br/>
         <input type='radio' name="tipo" onClick={handleRadio} value="1" />usuario
         <br/>
         <input type='radio' name="tipo" onClick={handleRadio} value="0" />transportista</p>
         <br/>
     { radio.tipo==='1' ?( 
         <>
        <h2>Usuario</h2>
       Id <input type="text" name="id"   onChange={handleInput}/><br/>
       Origen <input type="text" name="orig"   onChange={handleInput}/><br/>
        Destino <input type="text" name="destination"   onChange={handleInput}/><br/>
         Peso <input type="text" name="weight"   onChange={handleInput}/><br/>
         Precio <input type="text" name="price"   onChange={handleInput}/><br/>
        descripcion <input type="text" name="description"   onChange={handleInput}/><br/>
         <button onClick={sendMessage}>Send Message</button>
         <h3> {showData?(<ul style={{listStyleType: 'none',textAlign:'left'}}>
                <li>{showData.id}</li> 
                <li>{showData.orig}</li>
                <li>{showData.destination}</li>
                <li>{showData.weight}</li>
                <li>{showData.price}</li>
                <li>{showData.description}</li>
                </ul>):'esperando Respuesta'} </h3>
         </>
     ): radio.tipo==='0' ?( <h2>transportista</h2> ):<h2>Seleccione un usuario</h2>} 
       
       
         
     
    </div>
  );
}

export default App;
