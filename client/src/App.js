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
      userId:'', 
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
    const respMessage = () =>{
      const aceparTravel={
        carrierId:'09135748-3751-40fe-b016-a6a601cc42cc',
        userId:showData.userId
      }
      socket.emit('response',aceparTravel);

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
       userId <input type="text" name="userId"   onChange={handleInput}/><br/>
       Origen <input type="text" name="orig"   onChange={handleInput}/><br/>
        Destino <input type="text" name="destination"   onChange={handleInput}/><br/>
         Peso <input type="text" name="weight"   onChange={handleInput}/><br/>
         Precio <input type="text" name="price"   onChange={handleInput}/><br/>
        descripcion <input type="text" name="description"   onChange={handleInput}/><br/>
         <button onClick={sendMessage}>Send Message</button>
         <h3> {showData.userId!==''?(
           <>   <ul style={{listStyleType: 'none',textAlign:'left'}}>
                <li>userId {showData.userId}</li> 
                <li>Origen {showData.orig}</li>
                <li>Destino {showData.destination}</li>
                <li>Peso {showData.weight}</li>
                <li>Precio {showData.price}</li>
                <li>description {showData.description}</li>
                <li></li>
                </ul>
               
          </>
                ):'esperando Respuesta'}
        </h3>
         </>
     ): radio.tipo==='0' ?( 
       <>
     <h2>transportista</h2> 
     <h3> {showData.id!==''?(
     <> 
     <ul style={{listStyleType: 'none',textAlign:'center'}}>
                <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>userId:</b> <i>{showData.userId}</i></li> 
                <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Origen:</b> <i>{showData.orig}</i></li>
                <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Destino:</b> <i>{showData.destination}</i></li>
                <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Peso:</b> <i>{showData.weight}</i></li>
                <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Precio:</b> <i>{showData.price}</i></li>
                <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>description:</b> <i>{showData.description}</i></li>
                </ul>
                 <button onClick={respMessage}>Response Message</button>
            </>     
                ):'esperando Respuesta'}
        </h3>
     </>
     ):<h2>Seleccione un usuario</h2>} 
       
       
         
     
    </div>
  );
}

export default App;
