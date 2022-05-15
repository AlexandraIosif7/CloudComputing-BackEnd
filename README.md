# "My Routes" Application - Cloud Computing Project - 2022

## 1. Introducere + Descriere

Aplicatia „My Routes” ne ajuta sa cautam diverse trasee (cu masina) intre 2 locatii diferite (national si international) si sa le vizulizam pe harta impreuna cu detaliile despre distanta de parcurs si timpul aproximat. Harta poate fi customizata prin mai multe tipuri de vizualizare.

Pentru toate functionalitatile legate de harta a fost folosit **serviciul in cloud GOOGLE MAPS**, mai specific *3 API-uri din cadrul acestuia*: JavaScript API, Directions API si Places API.

Aplicatia este legata la o *baza de date remote* care functioneaza, de asemenea in cloud, **GOOGLE FIRESTORE**. 

Back-end-ul este realizat in NodeJS cu ajutorul unui server express si al unui API simplu cu care sunt realizate operatiile CRUD pe baza de date.

Front-end-ul este realizat in React, iar legatura dintre back-end si front-end este facuta cu ajutorul Axios.

Aplicatia finala a fost publicata cu ajutorul unei **platforma in cloud, HEROKU**.

## 2. Descriere API
Maps JavaScript API, Directions API si Places API sunt toate 3 accesate cu ajutorul librariei @react-google-maps/api si sunt utilizate in partea de front-end.

**Maps JavaScript API**: permite să afisam si sa personalizam hărțile cu propriul conținut și imagini pentru afișare pe pagini web și dispozitive mobile. 
Cu ajutorul acestuia se genereaza harta propriu-zisa, transpusa prin intermediul componentei GoogleMap. Harta este initializata cu centrul in locatia Facultatea de Cibernetica ASE, iar mai apoi se va modifica in functie de locatiile cautate de user.
Harta ofera cateva posibilitati de customizare: vizualizare sub forma de Harta, de Satelit sau de StreetView, zoom.

**Places API**: este un serviciu care returnează informații despre locuri folosind solicitări HTTP. Locurile sunt definite în cadrul acestui API ca unități, locații geografice sau puncte de interes proeminente. In cadrul aplicatiei am fololsit requestul Autocomplete care completează automat numele și adresa unui loc pe măsură ce utilizatorul introduce de la tastatura numele locatiei pe care o cauta. Cele doua campuri, origine si destinatie, sunt completate cu ajutorul Autocomplete.

**Directions API**: este un serviciu web care utilizează o solicitare HTTP pentru a returna indicații în format JSON sau XML între mai multe locații. Cu ajutorul lui DirectionService am calculat traseul intre cele 2 locatii cautate de user, iar componenta DirectionRenderer transpune traseul in harta noastra pe baza informatiilor primite de la DirectionService. In acelasi timp am obtinut si informatii cu privire la distanta de parcurs si durata aproximata a calatoriei cu masina.

<img src="https://user-images.githubusercontent.com/62136927/168478399-6cf96a55-b356-4050-8d12-b05c88ffa94a.png" width="400" height="70">

**API-ul pentru legatura cu baza de date**: Baza de date este remote si pentru aceasta am ales Cloud Firestore. Cu ajutorul ei putem salva traseele noastre preferate intr-o colectie pe care o putem accesa ulterior pentru a obtine detaliile traseelor. Putem, de asemenea, sa facem o cautare specifica dupa un anumit loc in colectia de trasee salvate deja, sau sa stergem un traseu din baza de date in cazul in care ne dorim asta.

Pentru a realiza aceste operatii CRUD pe baza de date am scris un router simplu cu 4 metode: 2 de tip GET, 1 de tip POST si 1de tip DELETE

<img src="https://user-images.githubusercontent.com/62136927/168478630-ecc589f5-a21e-49c8-abcb-dcd47ce1e784.png" width="230" height="170"><img src="https://user-images.githubusercontent.com/62136927/168478633-0c26cc5e-81ec-491e-94dc-f6dcd266c155.png" width="400" height="170">

## 3. Flux de date
### Metodele HTTP din API-ul pentru comunicarea cu baza de date
*Metoda Get All Routes* nu primeste niciun parametru sau body si intoarce toate traseele salvate in baza de date.

*Metoda Get Routes By Specific Place* primeste ca parametru numele unei locatii introduse de utilizator si returneaza toate traseele care contin aceasta locatie, fie ca este punct de plecare sau destinatie.

<img src="https://user-images.githubusercontent.com/62136927/168478808-d74fada1-e252-44a6-974a-bf5604bbd623.png" width="350" height="400">

*Metoda Add New Route* primeste prin intermediul body-ului 4 informatii: origin, destination, duration si distance si pe baza acestora creaza un nou document pe care il adauga in colectia din baza de date.

*Metoda Delete By Id* primeste ca parametrul id-ul unui document care va fi ulterior sters din colectia din baza de date.

### Autentificare și autorizare servicii utilizate
*Conexiunea si utilizarea bazei de date in cloud Firestore* are nevoie de o **cheie unica de tipul JSON** care a fost salvata in cadrul subfolderului specific back-end-ului. Pentru ca am folosit Firestore pe partea de server a fost nevoie si de instalarea librariei *„firebase-admin”.*

<img src="https://user-images.githubusercontent.com/62136927/168478959-c00b9fa1-2036-4f38-a64b-1efe647b2aab.png" width="390" height="170">

Pentru utilizarea celor *3 API din serviciul Google Maps* a fost nevoie de generarea unei **chei de tipul API KEY**, salvata in folderul .env din cadrul front-end-ului si folosit ulterior in componenta Maps.

<img src="https://user-images.githubusercontent.com/62136927/168479101-6b2836e4-75fb-4a33-8ecf-33cd361ea0c7.png" width="500" height="100">

## 4. Capturi de ecran

### Pagina initiala

![image](https://user-images.githubusercontent.com/62136927/168479174-e99983eb-0d44-470d-89f0-c056174618e3.png)

### Vizualizare harta cu StreetView

![image](https://user-images.githubusercontent.com/62136927/168479210-7b569222-5161-4bed-86a1-7d210a205d6d.png)

### Calcularea unei noi rute

![image](https://user-images.githubusercontent.com/62136927/168479226-155b89a6-3c83-47e8-9490-d10fc86981b1.png)

### Cautarea dupa locatie specifica in baza de date

![image](https://user-images.githubusercontent.com/62136927/168479248-d13d6c61-0f70-4629-9474-04ecf1f1435e.png)

## 5. Referinte
Link-ul public catre aplicatie: https://limitless-mountain-65168.herokuapp.com/ 

Link demo aplicatie YouTube:



