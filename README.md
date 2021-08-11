Request Object
El objeto req (Request) en Express representa el llamado HTTP y tiene diferentes propiedades del llamado, como la cadena de texto query (Query params), los parámetros de la URL (URL params), el cuerpo (Body), los encabezados (HTTP headers), etc.
Para acceder al req basta con acceder al primer parámetro de nuestros router handlers (router middleware) ó middlewares.

req.body
Contiene los pares de llave-valor de los datos enviados el cuerpo (body) del llamado (request). Por defecto es undefined pero es establecido cuando se usa algún “body-parser” middleware como body-parser y multer.
En Postman cuando hacemos un request y enviamos datos en la pestaña Body, estos middlewares son los que nos ayudan a entender el tipo de datos que vamos a recibir en el req.body.

req.params
Esta propiedad contiene un objeto con las propiedades equivalentes los parámetros nombrados en la ruta. Por ejemplo si tenemos una ruta de la forma /user/:name entonces la propiedad name esta disponible como req.params.name y alli podremos ver su valor, supongamos que llamáramos la ruta con /user/freddyjjcm, entonces el valor de req.params.name seria freddyjjcm. Este objeto por defecto tiene el valor de un objeto vacío {}.

req.query
Esta propiedad contiene un objeto con las propiedades equivalentes a las cadenas de texto query de la ruta. Si no hay ninguna cadena de texto query tendrá como valor por defecto un objeto vacío {}.

Middlewares populares de express:

express.json o body-parser.json: Sirve para que nuestras requests entiendan json
cors: Middleware de seguridad que sirve para que los requests sean aceptados de ciertos dominios específicos
morgan: Middleware para el manejo de logs
helmet: Middleware de seguridad
express-debug: El debugger predeterminado de express para debuggear tu aplicación
express-slash: Permite aceptar urls sin el slash (’/’)
passport: Para autentifación y autorización

JWT
Es un estándar (RFC 7519) que define una forma de contenido seguro para transmitir información entre dos partes. Puede estar firmado usando un algoritmo (HMAC) o un par de llaves (public / private) usando (RSA / ECDSA).

Escenarios

Autorización,el escenario típico donde una vez que el usuario esta loggeado, cada subsecuente petición deberá incluir el JWT, permitiendo al usuario acceder a rutas, servicios y recursos donde está autorizado con el JWT.
. Intercambio de información, el escenario donde al utilizar, el par de llaves, se puede asegurar el intercambio de información sabiendo la procedencia del emisor. Adicionalmente, siendo un proceso cifrado usando el header y el payload, podemos verificar si el contenido ha sido manipulado.

Estructura de un JWT

Header
Compuesto de dos partes:
. El tipo de token, JWT.
. El algoritmo usado para cifrar, HMAC SHA256 o RSA.

Payload
Contenido de tres tipos:
. Registro, iss (issuer) exp (expiration time) sub (subject), aud (audience) u otros.
. Público, definido en formato IANA JWT Registry.
. Privado, personalizados para compartir información entre las partes sin que sean públicos o registrados.

Signature
. Es una combinación entre:
. Header
. Payload
. Una cadena o “secret”
. Algoritmo determinado en el header.
