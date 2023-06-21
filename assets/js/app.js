// Variables 
const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

/*traer elementos con nodos de DOM

Tradicionales 

//getElementByID: busca elementos por su ID
//getElementsByClassName: busca por elementos por su clase
//getElementsByTagName


Modernos 
    querySelector(): Busca el primer elemento que coincide con el selector de CSS
    querySelectorAll(): Busca todos los elementos que coinciden con el selector de CSS

Refrenciar nodos a una variable -> const nameUser = document.querySelector('a.name');

https://platzi.com/discusiones/1050-programacion-basica/113588-hay-alguna-diferencia-entre-usar-id-y-usar-name-en-la-etiqueta-input-de-html/#:~:text=id%20suele%20ser%20usado%20para,servidor%20o%20base%20de%20datos.
*/
const nameUser = document.querySelector('#name');
const blogUser = document.querySelector('#blog');
const locationUser = document.querySelector('#location');


/*Funcion que devolvera una promesa
https://es.javascript.info/async-await

- async = Se asegura de que la funcion devuelva una promesa o envuelve las no promesas y las transforma en una 
- await = Espera hasta que la promesa se resuelva. suspende la ejecución de la función hasta que se establezca la promesa, y luego la reanuda con el resultado de la promesa
*/
async function displayUser(username) {
  //textcontent Cambia el contenido del texto https://www.w3schools.com/jsref/prop_node_textcontent.asp
  nameUser.textContent = 'cargando...';

  const page = `${usersEndpoint}/${username}`;
  //Espera con await para poder llamar o invocar page con fetch
  /* Fetch API

  Es una interfaz de JS, que nos da un metodo llamado fetch, el cual nos permite manejar solicitudes HTTP (GET, POST, PUT, DELETE).

  Cuando usamos Fetch API sabemos que de forma implicita estamos usando promesas, tambien de forma implicita sabemos que esa promesa se puede resolver o rechazar.

  El metodo fetch toma una URL como argumento y devuelve una promesa que se resuelve como un objeto llamado "response", que incluye la respuesta de la solicitud (a parte de decirnos que la conexiion es ok, "pega" la informacion de lo que estamos consultado).

  Ya que tenemos el objeto llamado "response", vamos a poder hacer un monton de cosas como acceder a la info, leer el contenido, verificarlo, etc.
     
  https://es.stackoverflow.com/questions/375338/como-se-relaciona-resolve-y-reject-con-then-y-catch
  */
  const response = await fetch(page);

  // throw: es lanza, muestra un error, ejecuta o invoca. Ejemplo de throw -> if(x > 10) lanza "demasiado alto"; link -> https://www.w3schools.com/jsref/jsref_throw.asp
  if(!response.ok) throw (`Error en pagina ${page}`);

  //recibo una espera con await de la condicion de responso en un objeto JSON
  const data = await response.json();

  //cambio el contenido el texto en el html con los datos que obtengo en data (objeto)
  nameUser.textContent = data.name; //Cambio el texto por el nickname del usuario
  blogUser.textContent = data.blog; //Cambio el texto por el blog del usuario
  locationUser.textContent = data.location; //Cambio el texto por la ubicacion del usuario

  //Identifico que tipo es data = object
  console.log(typeof(data));
  

}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  n.textContent = `Algo salió mal: ${err}`
}

displayUser('davidaltamiram').catch(handleError);