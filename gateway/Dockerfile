FROM public.ecr.aws/amazoncorretto/amazoncorretto:17.0.6 as builder
WORKDIR /opt/app
ARG SPRING_PROFILES_ACTIVE
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw
COPY ./src ./src
RUN ./mvnw clean install

FROM public.ecr.aws/amazoncorretto/amazoncorretto:17.0.6
WORKDIR /opt/app
COPY --from=builder /opt/app/target/*.jar /opt/app/*.jar
ENTRYPOINT ["java", "-jar", "/opt/app/*.jar" ]