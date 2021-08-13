# Ecommerce

**Ecommerce** es el proyecto llevado a cabo en el curso de expressJS2018 de platzi.

## Documentación

### Express

**Express.js** es un _framework_ para crear aplicaciones web, apis y web services que ha sido inspirado en la librería Sinatra de Ruby. Es software libre y de código abierto con licencia MIT.

#### Características

- Es **minimalista**, lo que lo hace muy liviano ya que muchas de sus funcionalidades deben ser instaladas posteriormente a través de plugins y módulos adicionales.
- Incluye un sistema de **template engines** muy poderoso, con Handlebars, Pug, Mustach, etc. disponibles por defecto.
- Maneja **Routing**, con wildcards, parámetros, etc.
- Implementa middlewares, lo que es una de sus características más notables e importantes.
- Permite la instalación de plugins a travpes de middlewares.

#### Template engine

Un **template engine** es una implementación de software que nos permite mezclar datos con una plantilla o template con el fin de generar un documento que será renderizado en el navegador. Algunos de los template engines más conocidos son: Handlebars (para JavaScript), Twig y Blade (para Laravel / PHP), JSP (para Java) o Ninja (de python).

**Express** nos permite crear nuestro propio template engine personalizado. Además permite el uso de múltiples engines según la extensión de los archivos que le hayamos indicado.

    app.engine('<extension>', function( filePath, options, callback ){});

    app.set('views', '<directorio-de-vistas>');
    app.set('view engine', '<extension>');

Donde `filePath` indica la ruta del template, `options` indica las variables que vamos a mezclar con el template y `callback` será la función que mezcle la plantilla con las opciones para obtener el documento que será mostrado en el navegador.

Algo importante que debemos notar es que en Node, los callbacks son _"error first"_, por lo que el primer parámetro devuelto por las funciones por lo general serán siempre el objeto que contenga los detalles del error, si es que los hay.

Además en el objeto options recibido en el callback del engine, no solo se pasan las variables que definimos en la llamada, sino otros datos como settings y locals que deberemos descartar cuando estamos creando nuestro propio engine, pero que, cuando trabajamos con los template engines predefinidos, ya es Node quien se encarga de manejarlos.

#### Servicio de archivos estáticos en Express

Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado **express.static** de Express.

Pase el nombre del directorio que contiene los activos estáticos a la función de middleware **express.static** para empezar directamente el servicio de los archivos. Por ejemplo, utilice el siguiente código para el servicio de imágenes, archivos CSS y archivos JavaScript en un directorio denominado public:

`app.use('/static', express.static(path.join((__dirname + '/public')));`

#### Request Object

El objeto req (Request) en **Express** representa el llamado HTTP y tiene diferentes propiedades del llamado, como la cadena de texto query (Query params), los parámetros de la URL (URL params), el cuerpo (Body), los encabezados (HTTP headers), etc.

Para acceder al req basta con acceder al primer parámetro de nuestros router handlers (router middleware) ó middlewares.

     app.get('/user/:id', function(req, res) {
      res.send('user ' + req.params.id);
    });

##### request.body

Contiene los pares de llave-valor de los datos enviados el cuerpo (body) del llamado (request). Por defecto es undefined pero es establecido cuando se usa algún “body-parser” middleware como body-parser y multer.

En **Postman** cuando hacemos un request y enviamos datos en la pestaña Body, estos middlewares son los que nos ayudan a entender el tipo de datos que vamos a recibir en el req.body.

    const app = require('express')();
    const bodyParser = require('body-parser');
    const multer = require('multer');
    const upload = multer(); // Para datos tipo multipart/form-data

    app.use(bodyParser.json()); // Para datos tipo application/json
    app.use(bodyParser.urlencoded({ extended: true })); // Para datos tipo application/x-www-form-urlencoded

    app.post('/profile', upload.array(), function (req, res, next) {
      console.log(req.body);
      res.json(req.body);
    });

##### request.params

Esta propiedad contiene un objeto con las propiedades equivalentes los parámetros nombrados en la ruta. Por ejemplo si tenemos una ruta de la forma /user/:name entonces la propiedad name esta disponible como req.params.name y alli podremos ver su valor, supongamos que llamáramos la ruta con /user/glrodasz, entonces el valor de req.params.name seria glrodasz. Este objeto por defecto tiene el valor de un objeto vacío {}.
`req.params.name`

##### request.query

Esta propiedad contiene un objeto con las propiedades equivalentes a las cadenas de texto query de la ruta. Si no hay ninguna cadena de texto query tendrá como valor por defecto un objeto vacío {}.
req.query.q
// => "tobi ferret"

    // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
    req.query.order
    // => "desc"

    req.query.shoe.color
    // => "blue"

    req.query.shoe.type
    // => "converse"

#### Response Object
El objeto **response** representa la respuesta **HTTP** que envía una aplicación en Express.

Para acceder al res basta con acceder al segundo parámetro de nuestros router handlers (router middleware) o middleware.

    app.get("/user/:id", function(request, response) {
      response.send("user " + request.params.id);
    });

##### response.end()
Finaliza el proceso de respuesta. Este método viene realmente del core de** Node.js**, específicamente del método response.end() de http.ServerResponse.

Se usa para finalizar el *request* rápidamente sin ningún dato. Si necesitas enviar datos se debe usar response.send() y response.json().

    response.end();
    response.status(404).end();

##### response.json()
Envía una respuesta JSON. Este método envía una respuesta (con el content-type correcto) y convierte el parámetro enviado a una cadena de texto JSON haciendo uso de **JSON.stringify().**

El parámetro puede ser cualquier tipo de JSON, incluido un objeto, un arreglo, una cadena de texto, un boolean, número, null y también puede ser usado para convertir otros valores a JSON.

    response.json(null);
    response.json({ user: "tobi" });
    response.status(500).json({ error: "message" });

##### response.send()
Envía una respuesta HTTP. El parámetro body puede ser un objeto tipo Buffer, una cadena de texto, un objeto, o un arreglo. Por ejemplo:

    res.send(Buffer.from("whoop"));
    res.send({ some: "json" });
    res.send("<p>some html</p>");
    res.status(404).send("Sorry, we cannot find that!");
    res.status(500).send({ error: "something blew up" });

#### Middleware

En esencia, un **middleware** es una capa de software que lía entre dos módulos, componentes o funcionalidad, fungiendo como un mediador entre dichos elementos.
En la arquitectura REST, se puede utilizar en:

- Router
- Error-handling
- Authentication
- Validation request

##### Middlewares populares de express:

- express.json o body-parser.json: Sirve para que nuestras requests entiendan json
- cors: Middleware de seguridad que sirve para que los requests sean aceptados de ciertos dominios específicos
- morgan: Middleware para el manejo de logs
- helmet: Middleware de seguridad
- express-debug: El debugger predeterminado de express para debuggear tu aplicación
- express-slash: Permite aceptar urls sin el slash (’/’)
- passport: Para autentifación y autorización

#### JWT

Es un estándar (RFC 7519) que define una forma de contenido seguro para transmitir información entre dos partes. Puede estar firmado usando un algoritmo (HMAC) o un par de llaves (public / private) usando (RSA / ECDSA).

##### Escenarios

- **Autorización**,el escenario típico donde una vez que el usuario esta loggeado, cada subsecuente petición deberá incluir el JWT, permitiendo al usuario acceder a rutas, servicios y recursos donde está autorizado con el JWT.
- **Intercambio de información**, el escenario donde al utilizar, el par de llaves, se puede asegurar el intercambio de información sabiendo la procedencia del emisor. Adicionalmente, siendo un proceso cifrado usando el header y el payload, podemos verificar si el contenido ha sido manipulado.

##### Estructura de un JWT

- **Header**, compuesto de dos partes:

  1.  El tipo de token, JWT.
  2.  El algoritmo usado para cifrar, HMAC SHA256 o RSA.

  {
  "alg": "HS256",
  "typ": "JWT"
  }

- **Payload**

  1.  Contenido de tres tipos:
  2.  Registro, iss (issuer) exp (expiration time) sub (subject), aud (audience) u otros.
  3.  Público, definido en formato IANA JWT Registry.
  4.  Privado, personalizados para compartir información entre las partes sin que sean públicos o registrados.

  {
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
  }

- **Signature**, es una combinación entre:

  1.  Header
  2.  Payload
  3.  Una cadena o “secret”
  4.  Algoritmo determinado en el header

  HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)

#### Passport

**Passport** es un middleware de autenticación para **Node**. Está diseñado para cumplir un propósito singular: autenticar solicitudes. Al escribir módulos, la encapsulación es una virtud, por lo que **Passport** delega todas las demás funciones a la aplicación. Esta separación de preocupaciones mantiene el código limpio y fácil de mantener, y hace que **Passport** sea extremadamente fácil de integrar en una aplicación.

En las aplicaciones web modernas, la autenticación puede adoptar diversas formas. Tradicionalmente, los usuarios inician sesión proporcionando un nombre de usuario y una contraseña. Con el auge de las redes sociales, el inicio de sesión único mediante un proveedor de OAuth como _Facebook_ o _Twitter_ se ha convertido en un método de autenticación popular. Los servicios que exponen una API a menudo requieren credenciales basadas en token para proteger el acceso.

**Passport** reconoce que cada aplicación tiene requisitos de autenticación únicos. Los mecanismos de autenticación, conocidos como estrategias, se empaquetan como módulos individuales. Las aplicaciones pueden elegir qué estrategias emplear, sin crear dependencias innecesarias.

A pesar de las complejidades involucradas en la autenticación, el código no tiene por qué ser complicado.
`app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));`

#### CORS

El Intercambio de Recursos de Origen Cruzado (Cross-Origin Resource Sharing) es un mecanismo que agrega unos encabezados (Headers) adicionales _HTTP_ para permitir que un user agent (generalmente un navegador) obtenga permisos para acceder a los recursos de un servidor en un origin distinto (dominio) del que pertenece.

Por ejemplo una solicitud de origen cruzado seria hacer una petición _AJAX_ desde una aplicación que se encuentra en https://dominio-a.com para cargar el recurso https://api.dominio-b.com/data.json.

Por razones de seguridad, los navegadores restringen las solicitudes _HTTP_ de origen cruzado iniciadas dentro de un script.

Si necesitamos permitir request desde un dominio diferente al del servidor podemos usar el middleware **cors** para permitirlo, pero es importante no dejarlo expuesto a todos los dominios.

##### Habilitar CORS para todos los request (No recomendado en producción)

    const express = require("express");
    const cors = require("cors");
    const app = express();

    app.use(cors());

    app.get("/products/:id", function(req, res, next) {
      res.json({ msg: "This is CORS-enabled for all origins!" });
    });

    app.listen(8000, function() {
      console.log("CORS-enabled web server listening on port 8000");
    });

##### Habilitar CORS para los request especificos de un cliente (Recomendado para producción)

    const express = require("express");
    const cors = require("cors");
    const app = express();

    const corsOptions = { origin: "http://example.com" };

    app.use(cors(corsOptions));

    app.get("/products/:id", function(req, res, next) {
      res.json({ msg: "This is CORS-enabled for only example.com." });
    });

    app.listen(8000, function() {
      console.log("CORS-enabled web server listening on port 8000");
    });

Debemos tener en cuenta que para aplicaciones server-side es poco probable que necesiten el uso de **CORS** debido a que las aplicaciones conviven en el mismo dominio. Sin embargo, es buena practica habilitarlo para los llamados externos de nuestra API.

#### HTTPS

El Protocolo seguro de transferencia de hipertexto **(HTTPS)** es un protocolo _HTTP_ que funciona en el puerto 443 y utiliza un cifrado basado en **SSL (Secure Sockets Layer) / TLS (Transmission Layer security)** con el fin de crear un canal de comunicación seguro entre el cliente y el servidor.

##### Por qué usar HTTPS

Una de las razones por la cual siempre debemos usar sitios con **HTTPS** es que sin este cualquier individuo podría efectuar ataques conocidos como man-in-the-middle o eavesdropping y obtener nuestro usuario y contraseña en el momento en que intentamos acceder a este servicio que no tiene **HTTPS** establecido.

##### Funcionamiento

1. El cliente envía un mensaje al servidor y este responde con su certificado público.
2. El cliente comprueba que este certificado sea valido y toma la llave pública.
3. El cliente genera una cadena llamada pre-master secret y la encripta usando la llave publica del servidor y se lo envía.
4. El servidor usa su llave privada para comprobar el pre-master secret.
5. En ese momento tanto el cliente como el servidor usan el pre-master secret para generar un master secret que es usado como una llave simétrica.
6. Teniendo este par de llaves ya se pueden enviar mensajes seguros entre ellos.

##### Cómo habilitar HTTPS en nuestro servidor

Dependiendo el servicio de hosting que estemos usando puede ofrecernos o no una instalación de certificados de seguridad SSL/TLS que pueden tener algún costo. Sin embargo existen servicios como Let's Encrypt que permiten la instalación de este certificado completamente gratis. Servicios como Now y Heroku ofrecen **HTTPS** por defecto.
