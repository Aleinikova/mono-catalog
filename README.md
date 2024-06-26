# MonoCatalog

## About

- e-catalog project is website for managing a list of Electronic Products.

## Technologies

- React
- Redux-toolkit
- React-hook-form
- TypeScript
- Fluent UI React v9
- Nx
- Vite

## Structure

Folder `/apps` contains projects of mono repository. Folder `/libs` contains components, utils, hook and types, which can be used by projects

- To create new app run `npx nx g @nx/react:app [project-name] --directory=apps/[project-name]`
- To create new library run `npx nx g @nx/react:library [lib-name] --directory=libs/[lib-name] --unitTestRunner=jest --bundler=none`

## Start the application locally

- Run `npm install`
- Run `npx nx serve [project-name]` to start the application

Application should be open on `https` otherwise `officeatwork` iframe wouldn't work

## Start e-catalog locally

- Run `npm install`
- Run `npx nx serve e-catalog` to start the application

## Build for production

Run `npx nx build [project-name]` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

Run all test suites

```
npx nx run-many --all --target=test
```

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
