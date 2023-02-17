#
# Build stage
#
# FROM maven:latest AS build
# ARG DATABASE_USERNAME
# ARG DATABASE_URL
# ARG DATABASE_PASSWORD
# ENV DATABASE_USERNAME $DATABASE_USERNAME
# ENV DATABASE_URL $DATABASE_URL
# ENV DATABASE_PASSWORD $DATABASE_PASSWORD
# COPY src /home/app/src
# COPY pom.xml /home/app
# RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:17-oracle
COPY --from=build /home/app/target/open-note-0.0.1-SNAPSHOT.jar /usr/local/lib/open-note.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/open-note.jar"]