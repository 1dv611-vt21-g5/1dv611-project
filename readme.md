# Ysocial
En applikation som integrerar [Sensative](https://sensative.com/)s IoT-plattform [Yggio](https://yggio-beta.sensative.net/) med automationsplattformen [Zapier](https://zapier.com/). Kan användas för att t.ex. automatiskt twittra sensordata.

För att lära er om hur applikationen fungerar, se vår [tekniska dokumentation](https://github.com/1dv611-vt21-g5/1dv611-project/wiki/Teknisk-Dokumentation).


För att komma igång med applikationen lokalt:

## Backend

Förbered en `.env`-fil i roten av `/backend`:

```
# The internal host of yggio-service-example backend
# Should be 0.0.0.0 for running on Heroku, this will also make it available at localhost
BACKEND_HOST=0.0.0.0

# The internal port used by the yggio-service-example backend
# Set to 9999 as default, Heroku injects its own process.env.PORT and ignores this value
BACKEND_PORT=9999

# The live adress where the backend will be hosted - required for webhooks, not strictly required for development, but device updates wont work without it
BACKEND_URI=https://api.our-site.com

# The live adress of the frontend - required for OAuth, for development can be set to http://localhost:3000
FRONTEND_URI=https://our-site.com

# The URL of the REST API of the Yggio you want to use
# Should be the same as in frontend/.env.local
# https://api.yggio-sandbox.sensative.net is a suitable test server and is set as default
YGGIO_API_URL=https://api.yggio-beta.sensative.net

# The name of the provider that is created
# Can be set to anything
PROVIDER_NAME=Studentprojekt - Zapierintegration

# NOTE: Yggio Apps are created by user accounts, input your Yggio account details below
# Username of the user that creates the provider
YGGIO_ACCOUNT_USERNAME=
# Password of the user that creates the provider
YGGIO_ACCOUNT_PASSWORD=

# Mongodb URI
DB_CONNECTION_STRING=

# Session Secret, random long string
SESSION_SECRET=
```

För utveckling lokalt kan `BACKEND_URI` med fördel ställas in till en `ngrok`-adress så att den blir tillgänglig från nätet. `FRONTEND_URI` kan sättas till `http://localhost:3000` vilket är default för Next.js.

Sedan: 

  0. Starta `ngrok` med mot samma port som är inställd för backend i `.env` - t.ex. `./ngrok http 9999`, pastea sedan in adressen du blir tilldelad i `.env`
  1. `cd backend`
  2. `npm install` (första gången)
  3. `npm run dev` - detta startar servern med Nodemon som automatiskt laddar om vid kodändringar.


## Frontend

Förbered en `.env.local`-fil (notera att det måste vara `.env.local`) i roten av `/frontend`.

```
# The URL of the Yggio you want to use (note: not API url as in backend)
# https://yggio-sandbox.sensative.net is a suitable test server and is set as default
YGGIO_API_URL=https://yggio-beta.sensative.net

# The adress of the backend API - For development can be set to http://localhost:9999 (even if the backend is set to use ngrok)
BACKEND_URI=http://localhost:9999
```

Sedan:
  1. `cd frontend`
  2. `npm install` (första gången)
  3. `npm run dev`

## Efter

När båda frontend- och backend är igång i varsin process:

  1. Öppna din webbläsare.
  2. Navigera till `localhost:3000`


## Testning

Det finns automatiserade tester i både front- och backend. Vissa av dem kräver en anslutning till en MongoDB testdatabas varför `.env`-filerna måste ställas in korrekt.

**Backend**
  1. `cd backend`
  2. `npm run test`

**Frontend**
  1. `cd frontend`
  2. `npm run test`

Vi har även manuella tester, se dokumentationen i vår wiki.
