http://localhost:8888/config-client/development/master
http://localhost:8888/review/default
curl -k https://dev-usr:dev-pwd@localhost:8443/config/encrypt --data-urlencode "hello world"
curl -k https://dev-usr:dev-pwd@localhost:8443/config/decrypt -d 552e21415cca6e5796a00fd9df19cdb9a910cdba21de5b22ebc6e417bd15e7bd
curl -k https://writer:secret@localhost:8443/oauth2/token -d grant_type=client_credentials -s | jq .
https://localhost:8443/oauth2/authorize?response_type=code&client_id=reader&redirect_uri=https://my.redirect.uri&scope=product:read&state=35725

gradlew :config-server:build
docker build -t config-server .
docker build -t config-server config-server
docker run --rm -p8888:8888 -e "SPRING_PROFILES_ACTIVE=docker" config-server
docker compose up -d //run at git sh


spring.cloud.config.server.native.searchLocations: classpath:/config-repo
"# nproductsworkflow1" 
"# nproductsworkflow1" 
"# nproductsworkflow1" 
