# Laravel och React Projekt

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


## Tekniker
- **Laravel**: Ramverk för backend-utveckling med PHP.
- **React**: JavaScript-bibliotek för att bygga användargränssnitt.
- **Tailwind CSS**: Ett snabbt växande CSS-ramverk.

## Installation
För att installera projektet lokalt, följ dessa steg:

1. Klona projektet från GitHub-repositoriet:
   git clone https://github.com/danielmedie/event-invitation-app.git
   
Navigera till projektmappen:

Installera PHP-beroenden med Composer:

composer install
Installera Node.js-beroenden med npm 

npm install
Kopiera .env.example och döp om det till .env:

cp .env.example .env

Generera en ny applikationsnyckel:

php artisan key:generate

Jag använde phpmyadmin som databas och XAMPP

Konfigurera din databasanslutning i .env-filen.

Kör migrations och seed (om du vill ha testdata):

php artisan migrate --seed

Starta Applikationen
När installationen är klar, starta Laravel-applikationen och React-utvecklingsservern:

Starta Laravel-applikationen:

php artisan serve
I en annan terminal, starta React-utvecklingsservern:

npm run dev

klicka på länken efter " APP_URL:"  sen gå in på /login 

email: test@example.com
lösenord: password


Övrig Information
Krav: PHP, Composer, Node.js, npm eller Yarn.
Begränsningar: Inga kända begränsningar för närvarande.