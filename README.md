# Run locally
from rootfolder -> `npm run dev`

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

## Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

# Deployment steps

## Prerequisites
1. Install docker

## Deploy (Jelastic)
1. registry at https://code.lemoncompanies.com/docker/industria/container_registry
2. `docker login docker.code.lemoncompanies.com`
3. docker build -t industria:<tagname> .    (e.g. docker build -t industria:dev . or docker build -t industria:prod .) 
4. `docker push docker.code.lemoncompanies.com/docker/industria`
5. login to jelastic: https://app.cloud.interhostsolutions.be/
6. Redeploy container (click container name, redeploy -> select image name from dropdown)
7. Click ok -> the container will be redeployed


### Author
* [Davide Violante](https://github.com/DavideViolante)
