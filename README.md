
# **UPUTE**

---

Pokrenuti *docker desktop*

Pomaknuti se u root direktorij

**Pokrenuti komande:**

```
cd date-microservice
docker build -t date-microservice:1.0.0. .
cd ..

cd time-microservice
docker build -t time-microservice:1.0.0. .
cd ..

cd eureka
docker build -t eureka-microservice:1.0.0. .
cd..

cd gateway
docker build -t gateway-microservice:1.0.0. .

cd..
docker compose up
```

---

***\*Provjeriti jesu li svi mikroservisi registrirani na eureci (host.docker.internal:8761)***

---

### TESTIRANJE

```
curl --location "http://localhost:8080/realms/microservices/protocol/openid-connect/token" --header "Content-Type: application/x-www-form-urlencoded" --data-urlencode "username=test" --data-urlencode "password=test" --data-urlencode "client_id=gateway-client" --data-urlencode "grant_type=password"
```

spremiti vrijednost "**access_token**"

*\*(moguće da će trebati pričekati minutu da gateway registrira mikroservis (dobije se 404))*

```
curl --location "localhost:8760/date-microservice/date" --header "Authorization: Bearer acces_token"
```

---

### LOKACIJE

host.docker.internal:8080 -\> **KEYCLOAK**
*\*(admin/password)*

host.docker.internal:8761 -\> **EUREKA**

host.docker.internal:8760 -\> **GATEWAY**

---
