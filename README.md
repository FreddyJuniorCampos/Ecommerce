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
