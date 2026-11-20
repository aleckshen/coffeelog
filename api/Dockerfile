FROM node:24-alpine

WORKDIR /api

RUN npm install -g pnpm@12

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY . .

USER node

CMD ["node", "src/index.ts"]
