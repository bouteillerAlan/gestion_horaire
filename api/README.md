## Commit rule

See [here](https://github.com/bouteillerAlan/Commit-Rule)

## Endpoint naming rules

See [here](https://gitlab.helyx.dev/helyx-staff/archivist/api-rules/blob/master/README.md)

## ESLint rules

See [here](https://github.com/unlight/eslint-plugin-nestjs)

Custom rules : 
```
"padded-blocks": "off"
"indent": ["error", 2]
"valid-jsdoc": "error"
```

## JSDoc rules

See [more here](https://devdocs.io/jsdoc/) and [here](https://eslint.org/docs/rules/valid-jsdoc#top)

Example :
```
/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

## Files architecture rules

Each component have a proper folder whit this own tests, module, controller, schemas, ...

Example of file architecture : 
```
- back
  |_ dist
  |_ node_modules
  |_ public
  |_ script_mongo
  |_ test
  |_ src
      |_ component_a
          |_ dto
              |_ create_component_a.dto.ts
              |_ update_component_a.dto.ts
          |_ interfaces
              |_ component_a.interfaces.ts
          |_ schemas
              |_ component_a.schemas.ts
          |_ component_a.controller.ts
          |_ component_a.module.ts
          |_ component_a.service.ts
      |_ component_b
          |_ ....     
```

## Env file
For the development create a ``.env.development`` file in the root of the project.

For the production create a ``.env`` file in the root of the project.

``.env`` content :
```
db_uri          = '127.0.0.1'
db_port         = '27017'
db_name         = 'user'
db_user         = 'xxxxx'
db_pass         = 'xxxxx'
bcrypt_salt     = 10
secret          = 123456789
smtp_host       = 'xxxxx'
smtp_port       = 'xxxxx'
smtp_user       = 'xxxxx'
smtp_pass       = 'xxxxx'
smtp_user_from  = 'xxxxx'
smtp_mail_from  = 'xxxxx'
smtp_dirname    = 'xxxxx'
```



## Command
### Installation

```bash
$ yarn
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
