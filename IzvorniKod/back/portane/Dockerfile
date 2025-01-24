FROM openjdk:21

# Kopiranje izvrsnog JAR-a iz build containera u izvrsni container
COPY target/*.jar /app.jar

# Izlaganje porta
EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","/app.jar"]