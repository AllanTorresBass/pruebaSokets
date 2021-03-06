import app from "./src/app";
import { Travel } from './src/models/Travel';
import { Carrier } from './src/models/Carrier';
import { User_Reg } from './src/models/User_Reg';
import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io =require('socket.io')(server,{cors:{origin: "*"}});
interface error {
	err: string
}
///begin Sokets
 


io.on("connection", (socket:any)=>{
    console.log("User conneted: " + socket.id)
    
	 
	 
	  
 


    socket.on("message",async(data:any, callback:any)=>{
		console.log(data)
	 
      const { userId, orig, destination, weight, price, description }= data
      let TravelId= uuid();
		var newViaje = {
			id: TravelId,
			orig,
			destination,
			weight,
			price,
			description,
			userId: userId
		}
    let traveles = await Travel.create(newViaje)
   // console.log('traveles: ',traveles);
    socket.broadcast.emit('message', newViaje)
	let travel = await Travel.findAll()  
	socket.broadcast.emit('Travel', travel)
	 
    
	 
	 
 })
     socket.on("response",async(data:any)=>{
       
    const dateCarrier = await Carrier.findAll({where: { id: data.carrierId}})
 	const userReg = await User_Reg.findAll({where: { id : dateCarrier[0].idUserReg}})
   const upTravel = await Travel.update({ carrierId: data.carrierId }, { where: { userId:data.userId, carrierId:{[Op.eq]: null}}});
   const resp = {
	 	userReg: userReg[0],
	 	dateCarrier: dateCarrier[0]
	 	}
		 console.log(resp)
   socket.broadcast.emit('response', resp)
   })

//    socket.on("response", async (data: any) => {
// 	console.log(data)
// 	const dateCarrier = await Carrier.findAll({where: { id: data.carrierId}})
// 	const userReg = await User_Reg.findAll({where: { id : dateCarrier[0].idUserReg}})
// 	const resp = {
// 		userReg: userReg[0],
// 		dateCarrier: dateCarrier[0]
// 	}
// 	const upTravel = await Travel.update({ carrierId: data.carrierId }, { where: { userId: data.userId, carrierId: { [Op.eq]: null } } });
// 	socket.broadcast.emit('response', resp)
// })
   
})

 











////end sokets
 
sequelize
	.sync({ force: false, logging: false })
	.then(() => {
		console.log('base de datos conectada! :D')
		server.listen(3001, function () {
			console.log('App is listening on port 3001!');
		});
	})
	.catch((err: error) => console.error(err));



