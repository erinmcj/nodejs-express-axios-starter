# Kainos Job Role Manager - Frontend

An online job application that serves both Kainos recruitment admin to retrieve and update job roles and their relevant information and applicants to apply for roles.

## Table of Contents


- [How to start the application](#how-to-start)
- [How to run linting checks](#how-to-lint)
- [Tests](#tests)
  - [Unit Tests](#unit-test)
  - [Integration Test](#integration-test)
- [Running the backend](#backend)

## How to start the application

1. Install application dependencies, run:
```
    npm install
```

2. Start the application with either:

```
    npm start 
```

(To reload server when changes are made)
```
    npm run dev
```


3. To check that your application is running enter url:

```
    http://localhost:3000
 ```

## How to run linting checks
1. To run linting checks:
```
    npm run linter
```

## Tests

### Unit Tests 
```
    npm run test-unit
```

### Integration Tests 
```
    npm run test-integration
```

1. Run `npm run linter` to run linting checks

## How to run tests
# Unit tests 
1. npm run test-unit
# Accessibility tests
1. Start the application by running `npm start` or `npm run dev`
2. In another terminal, run the ests with this command `pa11y-ci`

# Integration tests
Note: integration tests are currently disabled since the backend server is currently not running outside of the application


## Running the backend
1. Follow the steps to run the backend for this application <a href="https://github.com/thomkainos/kainos-job-role-manager-backend" target="_blank">here</a>

