const Nota = require('./models/nota.model');
const mongoose = require ('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json({
  type:"*/*"
}));
app.use(cors())
app.use(bodyParser.json());

//la url donde escucha el servidor
const host = 'http://127.0.0.1:'+ port; 
app.get('/api/notas', async(req, res) =>{
  
    try{
      const nota = await Nota.find({});
     // res.status(200).send(nota);
     res.status(200).json(nota);
     //res.send(JSON.stringify(nota));
      //res.send(nota);
    //  console.log(res);
     // res.json(nota);
    }
    catch(error){   
      res.status(500).json({message:error.message})
      }
      
  });

app.post('/api/nota',async(req,res)=>{
    console.log(req.body);
    try{
      const nota = await Nota.create(req.body);
      res.status(200).json(nota);
    }
    catch(error){
      console.error("Connection failed "+error);
      res.status(500).json({message:error.message})
      }
      

  });

  app.get('/api/nota/:id',async(req,res)=>{
  
    try{
      const {id} = req.params;
      const nota = await Nota.findById(id);
      res.status(200).json(nota);
    } catch(error){
     
      res.status(500).json({message:error.message})
      }    
  });
  
  
app.put('/api/nota/:id',async(req,res)=>{
    console.log(req.body);
    try{
      const {id} = req.params;
      const nota = await Nota.findByIdAndUpdate(id, req.body);
      
      if(!nota){
        return res.status(404).json({message: "Nota no encontrada"})
      }
  
      const updateNota = await Nota.findById(id);
  
      res.status(200).json(updateNota);
    } catch(error){
     
      res.status(500).json({message:error.message})
      }    
  });
 

  app.delete('/api/nota/:id',async(req,res)=>{
  
    try{
      const {id} = req.params;
      const nota = await Nota.findByIdAndDelete(id);
      
      if(!nota){
        return res.status(404).json({message: "Nota no encontrada"})
      }
  
      const updateNota = await Nota.findById(id);
  
      res.status(200).json("Nota eliminada correctamente");
    } catch(error){
     
      res.status(500).json({message:error.message})
      }    
  });


mongoose.connect("mongodb+srv://userDB:userDB@backenddb.ll1ev.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected");
    app.listen(port, () => {
      console.log(host);
    });
}).catch((error)=>{
    console.log("Connection failed "+error);
})