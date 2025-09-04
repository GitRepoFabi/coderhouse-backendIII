<h2> Entrega final – Comisión 74590 – Backend III: Testing y Escalabilidad Backend - Proyecto Adoptme - Coderhouse </h2>

<h3>Objetivos generales:</h3>

<p>
  Implementar las últimas mejoras en nuestro proyecto y Dockerizarlo.
</p>

<h3> Objetivos específicos: </h3>

<p>
  
- Documentar las rutas restantes de nuestro proyecto.

- Añadir los últimos tests

- Crear una imagen de Docker.

</p>

<h3> Instrucciones de instalación del proyecto: </h3>

1. Clonar el repositorio:
```bash
git clone https://github.com/GitRepoFabi/coderhouse-backendIII.git .
```
2. Instalar las dependencias:
```bash
npm install
```
3. Configurar un archivo .env con las siguientes variables de entorno:

```bash
PORT=
MONGO_URI=
DB_NAME=
```

4. Iniciar proyecto:
```bash
npm start
```
Tener en cuenta que para correr correctamente el proyecto se necesita tener instalado Node con la versión 22 o superior a la misma.

Para saber la versión de node instalada deberías correr el siguiente comando:

```bash
node --version
```

<h3> Corrida de test unitarios del proyecto: </h3>

Para correr los test unitarios se deberá ejecutar el siguiente comando:

```bash
npm test
```
Esto deberá ser suficiente para correr los test unitarios elaborados y configurados en la carpeta test del proyecto.



<h3> Instrucciones para crear la imagen local en Docker: </h3>

1. Pararse en el directorio del proyecto y ejecutar el siguiente comando para crear la imagen:
   
```bash
docker build -t DOCKER_USERNAME/serverxxxx .
```
En Docker Desktop debe de quedar así:

 <img width="886" height="67" alt="image" src="https://github.com/user-attachments/assets/0414480e-16f4-4e1e-a709-e110143e0bec" />

Con esto corroboramos que se creó correctamente la imagen.

2. Para subirla a Docker Hub debemos ejecutar el siguiente comando:

```bash
docker push DOCKER_USERNAME/serverxxxx
```

<h3> Instrucciones para correr la imagen subida de Dockerhub: </h3>

1)	Ejecutar el siguiente comando en una consola del sistema para bajar la imagen que quedó publicada en Docker Hub:
```bash
docker pull fabil2025/serverentregafinal:1.0.0
```
o ir a la dirección https://hub.docker.com/r/fabil2025/serverentregafinal y descargar de allí la imagen.

En Docker Desktop debe de quedar así:

 <img width="886" height="67" alt="image" src="https://github.com/user-attachments/assets/1779e45d-8e0b-4d0e-a02f-0756de11ad77" />

Con esto corroboramos que se bajó la imagen correctamente.

2)	Si le damos al botón Play <img width="29" height="41" alt="image" src="https://github.com/user-attachments/assets/e98b5d64-b603-46c1-b6c4-6f6c34c9dca6" />, se nos abrirá la siguiente pantalla de configuración para la creación de nuestro nuevo contenedor:

<img width="886" height="884" alt="image" src="https://github.com/user-attachments/assets/2a8adc3f-9af0-42d2-8b2d-b87c3d398972" />

Debemos de completar la información que se nos pide, la más importante es la siguiente:

Container Name: Darle un nombre al contenedor que va a correr.

Ports: Ponerle un número de puerto que se quiera elegir para que desde el exterior se puedan hacer peticiones a dicho puerto.

Apartado Environment Variables:

Aquí debemos agregar las variables de entorno de la aplicación, en nuestro caso se deberá configurar de la siguiente manera:

PORT=3000
MONGO_URL=xxxxx
DB_NAME=adoptme

En caso de no pasarle las variables de entorno MONGO_URL y DB_NAME nuestra aplicación fallará, ya que a su inicio se conecta a la BD para luego estar disponible para los diferentes endpoint.

Si configuramos todo bien, debería aparecernos lo siguiente:

<img width="886" height="256" alt="image" src="https://github.com/user-attachments/assets/78a90e2c-d505-4d10-806a-216f00793878" />
 
3)	Sólo resta probar algún endpoint desde postman o alguna otra aplicación si quedó todo OK:

<img width="886" height="581" alt="image" src="https://github.com/user-attachments/assets/feea466f-68bb-4421-858e-d8084a93d49e" />
<img width="886" height="549" alt="image" src="https://github.com/user-attachments/assets/ca1d4b60-d6f0-442c-9185-856d82e37b2b" />


 
