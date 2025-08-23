# Glorious Ducksu Frontend
This repo contains all of the frontend code for the Glorious Ducksu local gaming server.

## Dependencies
To run this, you need to set up:
- [Node/NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [NextJS](https://nextjs.org/docs/getting-started/installation)
- [Gojo](https://github.com/varyn-woo/gojo) (Go server side of this project)

## Viewing the Site
To run the website, `cd` into the directory and run `npm run dev`. Then, go to `localhost:3000` to view the current version of the site. This will live update as you edit the code and save your changes.

## Protobufs
See `ducksu-protos/README.md` for more detailed instructions on setting up protos. If you have done all of the setup there, you should just be able to use:
```shell
buf generate
```
to generate the protos for this project.


The site will not function properly unless the Gojo server is also running. See the [README](https://github.com/varyn-woo/gojo/blob/main/README.md) for instructions on how to set it up and get it running.
