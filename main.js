import http from 'http'
import { status } from './status.js';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  } else if (req.method === 'GET') {
    if (req.url === '/red') {
      res.end(JSON.stringify({ red: status.red }));
    } else if (req.url === '/blue') {
      res.end(JSON.stringify({ blue: status.blue }));
    } else if (req.url === '/status') {
      res.end(JSON.stringify(status));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'page not found' }));
    }
  } else if (req.method === 'PUT') {
    if (req.url === '/red') {
      status.red++;
      res.end(JSON.stringify({ red: status.red }));
    } else if (req.url === '/blue') {
      status.blue++;
      res.end(JSON.stringify({ blue: status.blue }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'page not found' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'page not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/*De OPTIONS-methode is een HTTP-methode die wordt gebruikt om informatie op te vragen over de communicatieopties die beschikbaar zijn voor een bepaalde bron op een webserver. Het wordt meestal gebruikt als onderdeel van het Cross-Origin Resource Sharing (CORS) mechanisme.

CORS is een mechanisme waarmee een webpagina in een browser beperkte toegang kan krijgen tot bronnen van een andere domeinnaam dan de site waarop deze zich bevindt. Dit is een beveiligingsfunctie van webbrowsers om te voorkomen dat een pagina ongeautoriseerde toegang krijgt tot gegevens op een andere pagina.

Wanneer een webpagina in een browser een cross-origin verzoek doet, stuurt de browser eerst een OPTIONS-verzoek naar de server van de doelbron om te zien of de webpagina toestemming heeft om het verzoek te doen. Als de server de toestemming verleent, stuurt de browser het eigenlijke verzoek. De Access-Control-* headers worden gebruikt om de toestemming van de server voor het cross-origin verzoek aan te geven.*/



