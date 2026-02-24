# VPS Deploy

## Run on server

```bash
cd ~/bagger22
git pull origin main
npm ci
npm run build
pm2 restart bagger22 --update-env
npm run warmup:images
pm2 save
```

Default app port is `3000`.
Use Nginx or Caddy as reverse proxy for ports `80/443`.

## Optional image preprocessing (local/dev)

```bash
npm run compress:images
```

This converts catalog/gallery JPG/PNG files to WebP for faster delivery.