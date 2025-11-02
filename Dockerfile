# Use OpenJDK 21 image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven/Gradle build files (if using Maven)
COPY target/*.jar app.jar

# Expose backend port
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
