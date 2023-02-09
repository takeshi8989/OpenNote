#
# Build stage
#
FROM maven:latest AS build
ENV DATABASE_USERNAME=postgres \
    DATABASE_URL=jdbc:postgresql://open-note-dev-db.cextjdlvxeq0.us-west-2.rds.amazonaws.com:5432/postgres \
    DATABASE_PASSWORD=H2take&noko8989
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

# #
# # Package stage
# #
# FROM openjdk:17-oracle
# COPY target/*.jar app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

#
# Package stage
#
FROM openjdk:17-oracle
COPY --from=build /home/app/target/open-note-0.0.1-SNAPSHOT.jar /usr/local/lib/open-note.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/open-note.jar"]