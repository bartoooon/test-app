# TestApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.3.

## Docker

This project uses Docker to build and run an Angular application. It also uses Docker Compose to simplify the process of running in a multi-container environment.

To run TestApp with docker use the following commands:

1.(First run) docker-compose up --build -d

This command does the following:

- `docker-compose up`: Starts the services defined in the `docker-compose.yml` file.
- `--build`: Forces Docker to rebuild the images before starting the services.
  This is particularly useful when you run the command for the first time or after modifying the Dockerfile or any related files (such as application dependencies or configurations).
- `-d`: Runs the services in detached mode, meaning the containers will run in the background and you will get back to the terminal prompt immediately.
  The result is that your application will be built and started in the background, ready to access via `http://localhost:4200`.

```bash
docker-compose up --build -d
```

2. docker-compose start

This command starts the services that are already created (e.g., previously built and stopped containers).
It will not rebuild the images or containers.

- Use this command when the containers have been built previously, and you want to restart them without rebuilding.

- You can run `docker-compose ps` to see the status of your services (whether they are running or stopped).

```bash
docker-compose start
```

3. docker-compose stop

This command stops the running containers without removing them.

- The containers will still exist in the system, but they will not be active. Use this command when you want to temporarily stop your services.
- To remove the stopped containers, you would use `docker-compose down`.

```bash
docker-compose stop
```

## Login user

If you don't want to register a new user right away, you can use the following test account's credentials:

```bash
Username: emilys
Password: emilyspass
```

Feel free to register a new user whenever you feel like it!

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
