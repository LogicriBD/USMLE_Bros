# USMLE_Bros

USMLE_Bros is a web application developed for our client and this work was procured through upwork

Docker Build Command

```
docker build -t usmle-bros --build-arg ENV_FILE=.env --build-arg APP_PORT=3000 .
```

Docker Run Command

```
sudo docker run --name usmle-bros -p 3000:3000 usmle-bros
```
