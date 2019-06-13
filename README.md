# IBMCloudWeatherApp

Hands On para construir aplicación del clima utilizando weather company data e IBM Bluemix.

## Índice

* Requisitos previos.
* Clonación y modificación del repositorio.
*
*

## Requisitos previos

Como primer requisito debe crear una cuenta en bluemix, para realizar esto puede acceder al siguiente enlace donde simplemente debe completar los espacios requeridos y dar crear cuenta.

https://cloud.ibm.com/registration

Como segundo requisito debe descargar e instalar el CLI de Cloud Foundry, para realizar esto en el siguiente enlace puede acceder a un git donde le daran explicación del proceso que debe realizar para realizar esta instalación.

https://github.com/cloudfoundry/cli

## Clonación y modificación del repositorio

Primero debe clonar el repositorio de la aplicación el cual lo podra hacer copiando el siguiente comando en su terminal, a su vez podra ver como se hace en la siguiente imagen.

` git clone https://github.com/IBM-Bluemix/weather-company-data-demo.git `

<img width="600" alt="1" src="https://user-images.githubusercontent.com/50923637/59445407-3a6ff400-8dc5-11e9-9c7a-1be02bf35e77.png">

Luego debe acceder a la carpeta que se creo al clonar el repositorio, la carpeta quedara con el nombre de **weather-company-data-demo** y estando en esta carpeta debe abrir el archivo de texto del manifest.yml, y en el debe realizar el cambio de **Name** a su gusto tenga en cuenta que sea algo unico y que no este ya creado, en este ejemplo sera llamado como **cambiar-nombre** y guarda dicho cambio.

```
applications:
- disk_quota: 1024M
name: cambiar-nombre
command: node app.js
path: .
domain: mybluemix.net
instances: 1
memory: 512M

```

Podrá ver el proceso anteriormente mencionado en las siguientes imagenes.

<img width="600" alt="2" src="https://user-images.githubusercontent.com/50923637/59446839-e0246280-8dc7-11e9-8132-b130f964c206.png">

<img width="600" alt="3" src="https://user-images.githubusercontent.com/50923637/59446844-e1ee2600-8dc7-11e9-8b3b-b9f0801f56ef.png">

El nombre de su aplicación será el mismo host que utilice determinar la URL de su aplicación inicialmente, por ejemplo `<host>.mybluemix.net.`

## 

[este es el link](https://cloud.ibm.com/docs/search/virtual%20server?locale=es)

