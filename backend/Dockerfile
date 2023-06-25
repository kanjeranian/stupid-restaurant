FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build

FROM node:18-alpine
COPY --from=0 /app/dist /app/dist
COPY --from=0 /app/package.json /app/package.json
COPY --from=0 /app/yarn.lock /app/yarn.lock
WORKDIR /app
RUN yarn install --production
CMD [ "node", "dist/index.js" ]
