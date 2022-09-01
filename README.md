# omnom
A web application that manages cooking recepies, suggests meals for the upcoming week, and adds the required ingredients to a shopping list. Besides the real use case, to me it serves as a learning project for how to set up a full stack dockerized web application.

## Flows
### Docker setup
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh
sudo usermod -aG docker ${USER}
```
### Docker registry setup
```
docker pull registry
```
### Run project locally
```
mvn package
docker build -f omnom-backend/src/main/docker/Dockerfile.jvm -t omnom-backend ./omnom-backend
docker-compose up
```

## Links
### Database
- https://vladmihalcea.com/the-best-way-to-map-an-enum-type-with-jpa-and-hibernate/
- https://herewecode.io/blog/create-a-postgresql-database-using-docker-compose/
- https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running
### Backend
- https://developers.redhat.com/articles/2022/02/03/build-rest-api-ground-quarkus-20
- https://enterprisecraftsmanship.com/posts/having-the-domain-model-separate-from-the-persistence-model/
- https://www.baeldung.com/jpa-attribute-converters
- https://www.jpa-buddy.com/blog/lombok-and-jpa-what-may-go-wrong/
- https://vepo.github.io/posts/using-bean-Validation-on-quarkus
- https://supakon-k.medium.com/how-to-fix-mapstruct-in-spring-boot-when-return-null-object-4ead44279af0
- https://howtodoinjava.com/resteasy/resteasy-exceptionmapper-example/
### Docker
- https://milanwittpohl.com/projects/tutorials/Full-Stack-Web-App/dockerizing-our-front-and-backend
- https://earthly.dev/blog/youre-using-docker-compose-wrong/
- https://stackoverflow.com/questions/58047984/why-do-i-need-to-declare-env-file-explicitely-in-docker-compose-yml
### Deployment
- https://docs.docker.com/registry/deploying/
- https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitHub-Actions-Secrets-Example-Token-Tutorial
- https://stackoverflow.com/questions/28349392/how-to-push-a-docker-image-to-a-private-repository
