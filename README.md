# Setup
Build the Node.js app image with the following :

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
```

# Run in development
Run your app with the following command :
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

You can then go to http://localhost:8080 to see the traefik dashboard.
You can go to http://app.test.localhost.tv to see your API in action

# Run in a different environment

If you want to run this app in a different environment, you should ideally just change the .env file, and run the following :
```
docker-compose -f docker-compose.yml up -d
```