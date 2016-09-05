# purfa-server
PUerta con Reconocimiento FAcial - Repositorio del backend hecho con node.js

##Introducción

Purfa es una puerta con reconocimiento facial realizada para la asignatura de Sistemas operativos avanzados en la Universidad Nacional de La Matanza, Argentina.
El sistema reconoce los usuarios que pasan frente a la puerta, y se traba o se destraba dependiendo de los permisos del usuario reconocido.

## Arquitectura

La arquitectura del sistema consiste de tres partes.

1. **Servidor:** El backend realizado en node.js está encargado de sincronizar el sistema embebido con la aplicación mobile. 
2. **App mobile:** La app mobile realizada en Android (Java) se encarga del enroll de los usuarios, controlar la puerta remotamente, habilitar/deshabilitar el sistema de reconocimiento automático, ver historiales de uso y asignar y revocar permisos a usuarios.
3. **Sistema embebido:** El sistema embebido realizado con Arduino (Processing) está montado sobre una puerta y utiliza como sensores una cámara, un botón y un sensor de movimiento y como actuadores un motor y dos luces, una verde (éxito) y una roja (fracaso).

## Servidor

Para realizar la programación del servidor elegimos utilizar node.js por la facilidad de aprendizaje y por el nulo esfuerzo de configuración previa del entorno de desarrollo.
Node.js es conocido por ser una herramienta ideal también para el prototipado y el desarrollo rápido de MVP (minimum viable product), por lo que consideramos que se ajusta perfectamente al caso de uso.
Para el desarrollo del servidor utilizamos, entre otras, las siguientes dependencias, cuidando siempre de utilizar lo estándar en la industria:
* **[Express.js:](https://github.com/expressjs/express)** Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles.
* **[Bluebird:](https://github.com/petkaantonov/bluebird)** Bluebird es una implementación de Promises (A+ compliant) que utilizamos para el manejo del código asincrónico.
* **[Mongoose:](http://mongoosejs.com/)** ODM para el manejo de la base de datos documental. [MongoDB](https://www.mongodb.com/es)
* **[Superagent:](https://github.com/visionmedia/superagent)** Cliente HTTP para consumir las APIs REST externas.

Y utilizamos los siguientes servicios, siempre con la licencia gratuita:
* **[Kairos:](https://www.kairos.com/)** API REST para reconocimiento facial.
* **[mLab:](https://mlab.com/)** Hosting de bases de datos Mongodb
* **[Heroku:](https://www.heroku.com/)** Despliegue y hosting de backends en node.js y otros lenguajes sin esfuerzo.

## Acerca de nosotros

El grupo de trabajo está integrado por:

* **Nahuel Roldán.** [Linkedin](https://www.linkedin.com/in/nahuel-rold%C3%A1n-4a52143a)
* **Agustín Bravo.** [Linkedin](https://www.linkedin.com/in/agustin-bravo-b23ab458)
* **Fernando Ortiz.** [Linkedin](https://www.linkedin.com/in/fernando-mart%C3%ADn-ortiz-77649167)
