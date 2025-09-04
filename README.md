# Glorious Ducksu Frontend
This repo contains all of the frontend code for the Glorious Ducksu local gaming server.

## Dependencies
To run this, you need to set up:
1. [Node/NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [`ducksu-protos`](https://github.com/varyn-woo/ducksu-protos)
3. [`gojo`](https://github.com/varyn-woo/gojo) (Go server side of this project)
4. Generate a certificate and key using `openssl` (certificate filepaths must correspond to the ones in `vite.config.ts`):
```shell
openssl req -x509 -newkey rsa:4096 -keyout dev.key -out dev.crt -days 365 -nodes -subj "/CN=localhost
```

## Viewing the Site
To run the website, `cd` into the directory and run:
```shell
npm run dev
```

Then, go to [`https://localhost:5173`](https://localhost:5173) to view the current version of the site. This will live update as you edit the code and save your changes.

## Protobufs
If the protobufs are out of sync after the initial submodule setup:
```shell
cd ducksu-protos
git pull
cd ..
buf generate
```

If you made any changes to the protos while working on this repo, make sure to commit your changes and make a pull request in `ducksu-protos`. If you made the most recent changes locally, you only need to generate new protos using:
```shell
buf generate
```


The site will not function properly unless the Gojo server is also running. See the [README](https://github.com/varyn-woo/gojo/blob/main/README.md) for instructions on how to set it up and get it running.
