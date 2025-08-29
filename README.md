# Glorious Ducksu Frontend
This repo contains all of the frontend code for the Glorious Ducksu local gaming server.

## Dependencies
To run this, you need to set up:
- [Node/NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [React Router](https://reactrouter.com/start/framework/installation)
- [Gojo](https://github.com/varyn-woo/gojo) (Go server side of this project)
- Generate a certificate and key using `openssl` (certificate filepaths must correspond to the ones in `vite.config.ts`):
```shell
openssl req -x509 -newkey rsa:4096 -keyout dev.key -out dev.crt -days 365 -nodes -subj "/CN=localhost
```

## Viewing the Site
To run the website, `cd` into the directory and run `npm run dev`. Then, go to `localhost:5173` to view the current version of the site. This will live update as you edit the code and save your changes.

## Protobufs
To set up the submodule when first cloning the repo:
```shell
git submodule update --init --recursive
```

To update the submodule after something in it changes:
```shell
git submodule update --recursive --remote
```


See `ducksu-protos/README.md` for more detailed instructions on setting up protos. If you have done all of the setup there, you should just be able to use:
```shell
buf generate
```
to generate the protos for this project.


The site will not function properly unless the Gojo server is also running. See the [README](https://github.com/varyn-woo/gojo/blob/main/README.md) for instructions on how to set it up and get it running.
