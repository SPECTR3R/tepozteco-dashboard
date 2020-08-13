//configuración personal de Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCVaGFLcMZt3jfdhrPn5X7cT231w699NR4',
  authDomain: 'check-in-trial-hiahqu.firebaseapp.com',
  databaseURL: 'https://check-in-trial-hiahqu.firebaseio.com',
  projectId: 'check-in-trial-hiahqu',
  storageBucket: 'check-in-trial-hiahqu.appspot.com',
  messagingSenderId: '614009805926',
  appId: '1:614009805926:web:1d58e744a34f73ebe6e1a7',
  measurementId: 'G-62042L7J7S',
}); // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Timestamp
//var forigen = Date.parse($('#checkin').val());
//var fechain = document.getElementById('checkin').value;
var timestampe = new Date();
console.log(timestampe);

//Agregar documentos
function guardar() {
  var reservacion = document.getElementById('reservacion').value;
  var checkin = document.getElementById('checkin').value;
  var checkout = document.getElementById('checkout').value;
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var room = document.getElementById('room').value;
  var adults = document.getElementById('adults').value;
  var childs = document.getElementById('childs').value;
  var correo = document.getElementById('correo').value;
  var telefono = document.getElementById('phone').value;

  if (nombre.lenght == 0 || apellido.lenght == 0) {
    function limpiar() {
      document.getElementById('reservacion').value = '';
      document.getElementById('checkin').value = '';
      document.getElementById('checkout').value = '';
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('room').value = '';
      document.getElementById('adults').value = '';
      document.getElementById('childs').value = '';
      document.getElementById('correo').value = '';
      document.getElementById('phone').value = '';
    }
    alert('No hay datos!');
  } else {
    db.collection('rsv')
      .add({
        rsv: reservacion,
        checkin: checkin,
        checkout: checkout,
        name: nombre,
        lastname: apellido,
        room: room,
        adults: adults,
        childs: childs,
        email: correo,
        phone: telefono,
        registered: 0,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('reservacion').value = '';
        document.getElementById('checkin').value = '';
        document.getElementById('checkout').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('room').value = '';
        document.getElementById('adults').value = '';
        document.getElementById('childs').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('phone').value = '';
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
  //Compara formatos
  const fechai = +new Date(checkin.value);
  console.log(fechai, Date.now());
}

//Leer documentos sin check-in

var tabla1 = document.getElementById('tchki');
db.collection('rsv')
  .where('registered', '==', 0)
  .onSnapshot(querySnapshot => {
    tabla1.innerHTML = '';
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data().name}`);
      tabla1.innerHTML += `
				<tr>
				<th scope="row">${doc.data().rsv}</th>
				<td>${doc.data().checkin}</td>
				<td>${doc.data().checkout}</td>
				<td>${doc.data().name}</td>
				<td>${doc.data().lastname}</td>
				<td>${doc.data().room}</td>
				<td>${doc.data().adults}</td>
				<td>${doc.data().childs}</td>
				<td>${doc.data().email}</td>
				<td>${doc.data().phone}</td>
				<td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
				<td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().rsv}','${
        doc.data().checkin
      }','${doc.data().checkout}','${doc.data().name}','${doc.data().lastname}','${
        doc.data().room
      }','${doc.data().adults}','${doc.data().childs}','${doc.data().email}','${
        doc.data().phone
      })">Editar</button></td>
				</tr>
				`;
    });
  });

//Leer documentos con registro realizado

var tabla2 = document.getElementById('tchko');
db.collection('rsv')
  .where('registered', '==', true)
  .onSnapshot(querySnapshot => {
    tabla2.innerHTML = '';
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data().name}`);
      tabla2.innerHTML += `
				<tr>
				<th scope="row">${doc.data().rsv}</th>
				<td>${doc.data().checkin}</td>
				<td>${doc.data().checkout}</td>
				<td>${doc.data().name}</td>
				<td>${doc.data().lastname}</td>
				<td>${doc.data().room}</td>
				<td>${doc.data().adults}</td>
				<td>${doc.data().childs}</td>
				<td>${doc.data().email}</td>
				<td>${doc.data().phone}</td>
				<td>${doc.data().arrivaltime}</td>
				<td>${doc.data().dniurl}</td>
				</tr>
				`;
    });
  });

//borrar documentos
function eliminar(id) {
  db.collection('rsv')
    .doc(id)
    .delete()
    .then(function () {
      console.log('Registro Eliminado!');
    })
    .catch(function (error) {
      console.error('Error al eliminar el documento: ', error);
    });
}

//editar documentos
function editar(
  id,
  reservacion,
  checkin,
  checkout,
  nombre,
  apellido,
  room,
  adults,
  childs,
  correo,
  telefono
) {
  document.getElementById('reservacion').value = reservacion;
  document.getElementById('checkin').value = checkin;
  document.getElementById('checkout').value = checkout;
  document.getElementById('nombre').value = nombre;
  document.getElementById('apellido').value = apellido;
  document.getElementById('room').value = room;
  document.getElementById('adults').value = adults;
  document.getElementById('childs').value = childs;
  document.getElementById('correo').value = correo;
  document.getElementById('phone').value = telefono;
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';
  console.log(
    reservacion,
    checkin,
    checkout,
    nombre,
    apellido,
    room,
    adults,
    childs,
    correo,
    telefono
  );

  boton.onclick = function () {
    var reservacionRef = db.collection('rsv').doc(id);
    // Actualizar documentos

    var reservacion = document.getElementById('reservacion').value;
    var checkin = document.getElementById('checkin').value;
    var checkout = document.getElementById('checkout').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var room = document.getElementById('room').value;
    var adults = document.getElementById('adults').value;
    var childs = document.getElementById('childs').value;
    var correo = document.getElementById('correo').value;
    var telefono = document.getElementById('phone').value;

    return reservacionRef
      .update({
        rsv: reservacion,
        checkin: checkin,
        checkout: checkout,
        name: nombre,
        lastname: apellido,
        room: room,
        adults: adults,
        childs: childs,
        email: correo,
        phone: telefono,
      })
      .then(function () {
        console.log('Documento actualizado!');
        boton.innerHTML = 'Guardar';
        document.getElementById('reservacion').value = '';
        document.getElementById('checkin').value = '';
        document.getElementById('checkout').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('room').value = '';
        document.getElementById('adults').value = '';
        document.getElementById('childs').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('phone').value = '';
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error de actualización: ', error);
      });
  };
}
