# API

Detta repository innehåller kod för ett enklare REST API byggt med **Express** och **MongoDB (Mongoose)**.  
API:et hanterar olika jobberfarenheter och fungerar som ett digitalt CV.  

## Funktionalitet

API:t erbjuder följande grundläggande funktioner:

- Hämta alla jobberfarenheter (GET)
- Lägga till en ny jobberfarenhet (POST)
- Uppdatera befintlig jobberfarenhet (PUT)
- Radera en jobberfarenhet (DELETE)
- Stöd för **CORS**, vilket gör det möjligt att testköra API:t från andra domäner eller portar (t.ex. från en frontend-app)

## API-anrop
Metod	| Ändpunkt	| Beskrivning
GET	| /works	| Hämtar alla jobberfarenheter
GET	| /works/:id |	Hämtar en specifik jobberfarenhet via ID
POST	| /works	| Lägger till en ny jobberfarenhet
PUT	| /works/:id	| Uppdaterar en befintlig jobberfarenhet
DELETE	| /works/:id	| Tar bort en jobberfarenhet

## Länk
En lokal version av API:et körs på följande adress:  
**http://127.0.0.1:3000/api**  

Alla jobberfarenheter nås via:  
**http://127.0.0.1:3000/works**

## Datamodell

Varje jobberfarenhet sparas som ett dokument i samlingen works i MongoDB, baserat på följande schema:

|Fält	        | Typ    |	Obligatoriskt |	Beskrivning|
|----------- -|--------|----------------|------------|
|companyname	| String |	✅ |	Namn på företaget
|jobtitle	    | String |	✅ |	Jobbtitel eller roll
|location	    | String |	✅ |	Plats för anställningen
|startdate	  | Date	 |  ✅ |	Startdatum för anställningen
|enddate	    | Date	 |  ❌ |	Slutdatum för anställningen (kan utelämnas om det är pågående)

Data skickas och sparas i JSON-format
```json
{
"companyname": "Hotell Laponia",
"jobtitle": "Receptionist",
"location": "Arvidsjaur", 
"startdate": "2021-10-17", 
"enddate": "2022-03-20"
}
