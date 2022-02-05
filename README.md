## **To start this app follow the instruction**

### ***Install Dependencies***
* Use npm or yarn to install the required dependencies
```console
foo@bar:~$ npm i (or) yarn
```
### ***Update the envinorments variables based on the [.env.example][env] file***
  * NODE_ENV => To set the environment
  * DATABASE_URL => Postgresql Database URL
  * JWT_SECRET => JWT Secret
  * NEXT_PUBLIC_APP_NAME => Application's Name
  * NEXT_APP_TOKEN_KEY => Name of local storage key for storing token
  * NEXT_APP_URL => Application's Base Url
  * HASH_LENGTH => Length of URL hash

### ***Run the application***
  * Create tables in the database (also can use the migration command)
  ```console
  foo@bar:~$ npm run push (or) yarn push
  ```
  * Build the app
  ```console
  foo@bar:~$ npm run build (or) yarn build
  ```
  * Run the app
  ```console
  foo@bar:~$ npm run start (or) yarn start
  ```

[env]: https://github.com/jehincastic/url_shortner/blob/master/.env.example