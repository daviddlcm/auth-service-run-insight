Seeders:
Para ejecutar todos los seeders:
npx sequelize-cli db:seed:all

para ejecutar los seeders invidivualmente:
npx sequelize-cli db:seed --seed seeders/xxxx-demo-roles.js

Para reiniciar y limpiar los seeders:
npx sequelize-cli db:seed:undo:all

Para crear un seeder:
npx sequelize-cli seed:generate --name demo-roles

Migrations:
Ejecutar:
npx sequelize-cli db:migrate

crear:
npx sequelize-cli migration:generate --name create-roles

eliminar:
npx sequelize-cli db:migrate:undo:all
