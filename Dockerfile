#
# Build stage
#
FROM maven:latest AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:17-oracle
COPY --from=build /home/app/target/open-note-0.0.1-SNAPSHOT.jar /usr/local/lib/open-note.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/open-note.jar"]