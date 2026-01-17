# How to use the server

1. install the necessary packages: `npm install`

2. create and set up the communication port in `.env`:

   ```.env
   API_PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=secret
   DB_DATABASE=outfithub
   ```

   NOTE: These are the default setup. Change to your needs.

3. create a database in mysql called `'outfithub'`

4. start the server: `npm run server`
