FROM node:19.0.0-alpine

WORKDIR /opt/app

ENTRYPOINT ["sh", "./setup.sh"]
