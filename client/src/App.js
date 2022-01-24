import { useEffect, useState} from "react";
import io from "socket.io-client";
import './App.css';
 
const socket = io.connect("http://localhost:3001");
socket.on('connection')
function App() {
  
  let [travelId, setTravelId] = useState("");
  let [travels, setTravels] = useState("");
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
    let [dataCarrier, setDataCarrier] = useState("");
    useEffect(() => {
      socket.on("Travel", (data) => {
         
        setTravels(data);
      });
      socket.on('response', (data) => {
         console.log(data)
        setDataCarrier(data);
      });
    


    }, [socket]);

    
  // console.log(travels);
   
  socket.on("message",(data)=>{
    setshowData(data)
})
       
const sendMessage = () =>{
 
   socket.emit('message', input , (response) => {
    console.log(response.status); // ok
    setTravelId(response.status);
    });
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
  
   // travels.foreach((el)=>console.log(el.id))
 //  { travels.map((el)=><p>{el.id}</p>)}
// console.log(showData)
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
        <h4>Id del viaje solicitado {travelId}</h4>
       userId <input type="text" name="userId"   onChange={handleInput}/><br/>
       Origen <input type="text" name="orig"   onChange={handleInput}/><br/>
        Destino <input type="text" name="destination"   onChange={handleInput}/><br/>
         Peso <input type="text" name="weight"   onChange={handleInput}/><br/>
         Precio <input type="text" name="price"   onChange={handleInput}/><br/>
        descripcion <input type="text" name="description"   onChange={handleInput}/><br/>
         <button onClick={sendMessage}>Send Message</button>
            <h3>Acptado por el conductor: 
              <br/>{dataCarrier.userReg.name} {dataCarrier.userReg.lastName}
              <br/>tlf: {dataCarrier.userReg.phone} eMail: {dataCarrier.userReg.eMail}
              </h3>
         </>
     ): radio.tipo==='0' ?( 
       <>
     <h2>transportista</h2> 
      
     <h3> {showData.id!==''?(
     <> 
      { showData.id?
          (<><ul style={{listStyleType: 'none',textAlign:'center'}}>
                      <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>userId:</b> <i>{showData.userId}</i></li> 
                      <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Origen:</b> <i>{showData.orig}</i></li>
                      <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Destino:</b> <i>{showData.destination}</i></li>
                      <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Peso:</b> <i>{showData.weight}</i></li>
                      <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>Precio:</b> <i>{showData.price}</i></li>
                      <li><b style={{marginRight:"30px",textDecoration: 'solid underline purple 4px'}}>description:</b> <i>{showData.description}</i></li>
                      </ul>
          <button onClick={respMessage}>Response Message</button></>):'Esperando viaje Actual'
         
         }
           <div>
                  <h1>Lista de viajes</h1>
                 <lu style={{listStyleType: 'none',textAlign:'center',fontSize:'8px'}}>
                       {travels?(travels.map(el=><li>{el.id} - {el.orig} - {el.destination} - {el.price} - {el.weight} - {el.userId}</li>)):''}  
                  {/* {travels.for((el,index)=>
                       <li key={index}> {el[index].id} </li>
               
                  )
                  } */}
                  </lu>
           </div>
           
            </>     
                ):'esperando Respuesta'}
        </h3>
     </>
     ):<h2>Seleccione un usuario</h2>} 
       
       
         
     
    </div>
  );
}

export default App;
