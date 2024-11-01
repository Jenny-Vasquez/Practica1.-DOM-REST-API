const mongoose = require('mongoose');

const NotaSchema = new mongoose.Schema({
  
  type: {
    type: Boolean
    
  },
  contenido: {
    type: String
  }  
}, {
  timestamps:true
});

const Nota = mongoose.model('Nota', NotaSchema);

module.exports = Nota;