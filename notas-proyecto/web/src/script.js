let _notas_ = [];
document.getElementById("form").style.visibility = "hidden";
//rellenar_tabla();
obtener_datos();
 path= "http://localhost:5000/api/";
 
 
 async function crearNota( data){

    const response = await fetch("http://localhost:5000/api/nota", {
        body: JSON.stringify(data ),
         method:"POST"
      
      }).then((x) => x.json())
      .then((notas) => {
       console.log(notas);    
       location.reload();
      });
}

async function eliminar( id){

    const response = await fetch(path+"nota/"+id,{
        method:"DELETE"
    })
    .then((x) => x.json())
      .then((notas) => {
       console.log(notas);
       
      });
}

async function editar( id, data){

    const response = await fetch(path+"nota/"+id,{
        method: "PUT",
        body: JSON.stringify(data )
    })
    .then((x) => x.json())
      .then((notas) => {
       console.log(notas);
       
      });
}





 function obtener_datos(ovt){
    var path= "http://localhost:5000/api/";
    fetch(path+"notas")
        .then((x) => x.json())
        .then((notas) => {
            _notas_= notas;
            console.log(notas);
           rellenar_tabla(notas);

        });
}

function rellenar_tabla(notas){
    let table = document.querySelector("#list-notes tbody");  
    table.innerHTML=""
    if (notas.length > 0)
    for (const item of notas) {
        var cat = (item.type)?"importante" : "normal";
        var checked = (item.type)?"checked":"";       
        var date_value= format(item.createdAt);
       
        let tr = "<tr >"+
                    "<td>  <input  id='categoria-"+ item._id + "' type='checkbox' "+checked+"> </input></td>"+
                "<td><input id='contenido-"+ item._id + "' type='text' value='"+ item.contenido +"'> </input></td>"+
                "<td><input id='createdAt-"+ item._id + "' type='date' value='"+  date_value +"' disabled> </input></td>"+
                "<td> <button id='btnEditar-"+ item._id +"' onclick=\"editarNota(\'" +item._id +"\')\">Editar</button>"+
                "<button id='btnGuardar-" + item._id + "' hidden onclick=\"guardarNota(\'" + item._id + "\')\">Guardar</button> </td>"+
                '<td> <button onclick="eliminarNota(\'' + item._id + '\');">Eliminar</button> </td>'
                "</tr>";

        table.innerHTML += tr;
        
    }
    else {
        table.innerHTML="";
    }
}

function format(createdAt){
    var date = new Date(createdAt);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear()+"-"+(month)+"-"+(day) ;
}
/*

async function count(){
    var index =0;
    var path= "http://localhost:5000/api/";
    const count = await fetch(path+"count")
        .then((x) => x.json())
        .then((notas) => {
            
            _count_=notas;

        });
    
}*/

function onSubmit() {

    var category_1 =  document.getElementById("category-1").checked;
    var category_2 =  document.getElementById("category-2").checked
    var content =  document.getElementById("content").value;
    var category= (category_2)?false:(category_1)?true:false;

   
        var data = {
            type: category,
            contenido: content
        };
        crearNota(data);
        document.getElementById("form").style.visibility = "hidden"
        document.getElementById("form").style.display = "none";
    
    
  
}
function verForm(oev) {
    document.getElementById("form").style.visibility = "visible";
     document.getElementById("form").style.display = "block";
}

function eliminarNota(id) {
    eliminar(id);
    location.reload();
}

function editarNota(id) {
    let btnEditar = document.getElementById("btnEditar-"+id);
    let btnGuardar = document.getElementById("btnGuardar-"+id);
    let hidden = btnEditar.getAttribute("hidden");

    if (hidden) {
       btnEditar.removeAttribute("hidden");
       btnGuardar.setAttribute("hidden", "hidden");
    } else {
       btnEditar.setAttribute("hidden", "hidden");
       btnGuardar.removeAttribute("hidden");
    }
    
}
function guardarNota(id) {

    var categoria =  document.getElementById("categoria-"+id).checked;
    var contenido =  document.getElementById("contenido-"+id).value;
  
        var data = {
            type: categoria,
            contenido:contenido
        };
        editar(id, data);
        location.reload();
    
   
}

function filtrar(evt){
    var notes_list_filter =[];
    const filterMonth = document.getElementById('filterMonth').value;
    var date_array = filterMonth.split("-");
    var filter_year= date_array[0];
    var filter_month= date_array[1];

    for (const item of _notas_) {
        var date =  new Date(item.createdAt);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = ""+date.getFullYear()
        
       
        if( filter_month=== month && filter_year===year){
            notes_list_filter.push(item);
        }     
    }
    console.log(notes_list_filter);
    rellenar_tabla(notes_list_filter);
}
/*
document.getElementById('filterButton').addEventListener('click', () => {
    const filterMonth = document.getElementById('filterMonth').value;
    const filteredNotes = notes.filter(note => {
        const noteDate = new Date(note.fecha);
        const filterDate = new Date(filterMonth);
        return noteDate.getMonth() === filterDate.getMonth() && noteDate.getFullYear() === filterDate.getFullYear();
    });
    UI.drawNotes(filteredNotes, document.getElementById('notzes'));
});
*/