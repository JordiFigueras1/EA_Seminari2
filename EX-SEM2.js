const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// pedir al usuario el id 
rl.question('Escribe el id del usuario: ', (sign) => {
  rl.close();
  fetch(`https://jsonplaceholder.typicode.com/users/${sign}`)
    .then((response) => response.json())
    .then((user) => {
      if (user.id) {
        console.log(user); 
        const fullnameAndMail = user.name + " (" + user.username + ")" + " "+user.email;
        console.log("Nombre completo y username:", fullnameAndMail);
      } else {
        console.log('Usuario no encontrado');
      }

      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${sign}`)
        .then((response) => response.json())
        .then((albums) => {
          console.log('Albums del usuario:', albums);

          // Combinando map, filter y reduce
          const totalTitleLength = albums
            .map((album) => album.title)                     // Mapeamos a los títulos
            .filter((title) => {
              const isShort = title.length <= 30;
              if (isShort) {
                console.log('Título filtrado:', title);        // Mostramos los títulos filtrados
              }
              return isShort;                                 // Devolvemos solo los títulos <= 30 caracteres
            })
            .reduce((acc, title) => acc + title.length, 0);  // Reducimos sumando la longitud de los títulos

          console.log('\nTotal de caracteres en los títulos filtrados:', totalTitleLength);
        })
        .catch((error) => console.error('Error en la carga de albums:', error));
    })
    .catch((error) => console.error('Error en la carga del usuario:', error));
});
