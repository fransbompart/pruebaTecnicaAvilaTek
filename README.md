## Prueba Tecnica - Avila Tek

## Para ejecutar la api

docker build -t pruebatecnica .

docker-compose build

docker-compose up

## Endpoints
Probar desde Postman

POST /signIn 
Body:
{
    "email": "example@example.com",
    "password": "example"
}

POST /signUp
Body:
{
    "email": "example@example.com",
    "password": "example"
}

POST /searchUser
Body:
{
    "email": "example@example.com"
}

GET /searchUsers/:page/:limit

POST /signOut

## Adicional
Crear el archivo .env siguiendo el archivo de ejemplo
