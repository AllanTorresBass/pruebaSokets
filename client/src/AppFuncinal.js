import { useState} from "react";
import io from "socket.io-client";
import './App.css';
 
const socket = io.connect("http://localhost:3001");
socket.on('connection')
function App() {
  
  let [radio, setRadio] = useState("");
  let [input, setInput] = useState("");
  socket.on("message",(data)=>{
    document.querySelector('h3').innerHTML = data
})
       
      const sendMessage = () =>{
        
       socket.emit('message',input.name);

    }
    function handleInput(e) {
  
      setInput({[e.target.name]: e.target.value });
     
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
         <input type="text" name="name" className="message"   onChange={handleInput}/>
         <button onClick={sendMessage()}>Send Message</button>
         <h3></h3>
         </>
     ): radio.tipo==='0' ?( <h2>transportista</h2> ):<h2>Seleccione un usuario</h2>} 
       
       
         
     
    </div>
  );
}

export default App;
