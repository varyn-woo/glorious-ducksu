# ducksu-protos

## Dependencies
1. Install `buf`: https://buf.build/docs/cli/installation/

## How does it work?
Each `.proto` file in this repo defines universal types such as `Player`, `GameState`, etc. that are shared between the front and back end.


This repo is added as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to both the backend and frontend.


The `buf.yaml` and `buf.gen.yaml` files in the repos define how the proto files are converted to actual code files defining the relevant types in the corresponding languages. This allows for the types to be defined once here instead of once per language used in the project.

## My protos are broken!! Oh no!!
In the `ducksu-protos` folder of whatever repo you're working in:
```shell
git pull
```

In the root folder of the repo:
```shell
buf generate
```

If it still doesn't work, oof.
