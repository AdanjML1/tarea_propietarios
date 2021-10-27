new Vue({
	el:"#objetoVue",
	data:{
		muestra:'hola bro',
		nombrePropietario:'',
		pApellido:'',
		sApellido:'',
		edad:'',
		curp:'',
		buscar:'',
		editando:0,
		propietarios:[
		               {curp:'MOLA020609HYNXGDA8',nombre:'adan',Apellido1:'Moo',Apellido2:'Lugo',edad:19},
		               {curp:'MOLA020609HYNXGDA8',nombre:'richard',Apellido1:'Moo',Apellido2:'Lugo',edad:17}

		             ],
	},
	methods:{
		propietarioN: function(){
			//con el condicional if garantisamos que no se guarde un valor vacio en propietarios
			if(this.nombrePropietario && this.pApellido && this.sApellido && this.edad){
			//con la palabra reservada var se crea el objetoPropietario con la misma estructura que propietarios
			//tambien se llaman a las variables donde los datos seran capturados
			var objetoPropietario={curp:this.curp,nombre:this.nombrePropietario,Apellido1:this.pApellido,Apellido2:this.sApellido,edad:this.edad};
			//esta linea sirve para enviar el objeto recabado hacia el array propietarios
			this.propietarios.push(objetoPropietario);
			//esta linea sirve para llamar a la funcion limpiar
			this.limpiar();

			//mensaje de confirmacion 
			Swal.fire({
             position: 'top-center',
             icon: 'success',
             title: 'El propietario se guardo correctamente',
             showConfirmButton: false,
             timer: 2000
              })
            //mensaje en caso de que no se cumplan las condiciones
			}else{
				Swal.fire({
             position: 'top-center',
             icon: 'error',
             title: 'Debes capturar todos los campos de datos',
             showConfirmButton: false,
             timer: 2000
              })
			}
		},
		limpiar: function(){
			this.nombrePropietario='';
			this.pApellido='';
			this.sApellido='';
			this.edad='';
			this.curp='';
		},
		eliminar: function(index){

			Swal.fire({
         title: 'Esta seguro de eliminar?',
         text: "No podras revertir el cambio luego de confirmar!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Sí, eliminar!'
         }).then((result) => {
           if (result.isConfirmed) {
           	//en esta funcion llamamos un atributo del array propietarios para validar que
			//el objeto exista y tambien que se elimine el seleccionado
			//el numero 1 indica cuantos elementos seran eliminados
			this.propietarios.splice(index,1);
            Swal.fire(
           'Eliminado!',
           'La mascota se eliminó :(',
           'Listo'
          )
          }
         })
		},
		editar: function(index){
			this.nombrePropietario=this.propietarios[index].nombre;
			this.pApellido=this.propietarios[index].Apellido1;
			this.sApellido=this.propietarios[index].Apellido2;
			this.edad=this.propietarios[index].edad;
			this.curp=this.propietarios[index].curp;
			//en esta linea le decimos que al ejecutarse este metodo editando cambiara al valor 1
			this.editando=1;
			this.indice=index;

		},
		cancelar:function(){
			this.limpiar();
			this.editando=0;
		},
		guardarCambios: function(){
			this.propietarios[this.indice].nombre=this.nombrePropietario;
			this.propietarios[this.indice].Apellido1=this.pApellido;
			this.propietarios[this.indice].Apellido2=this.sApellido;
			this.propietarios[this.indice].edad=this.edad;
			this.propietarios[this.indice].curp=this.curp;

			this.limpiar();
			this.editando=0;
			Swal.fire({
             position: 'top-center',
             icon: 'info',
             title: 'Los cambios se han guardado',
             showConfirmButton: false,
             timer: 1500
             })
		},



	},
	computed:{
		filtroPropietario:function(){
			return this.propietarios.filter((propietario)=>{
				return propietario.curp.toLowerCase().match(this.buscar.toLowerCase().trim())||
				 propietario.nombre.toLowerCase().match(this.buscar.toLowerCase().trim())||
				  propietario.Apellido1.toLowerCase().match(this.buscar.toLowerCase().trim())
			});
		},
		numeroPropietario:function(){
			var num=0;
			num=this.propietarios.length;
			return num;

		},

	},

});