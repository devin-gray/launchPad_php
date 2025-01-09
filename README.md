# LaunchPad CMS

A modern, full-stack CMS starter template built with Laravel, Vue.js, TailwindCSS, Vite, and DaisyUI. Perfect for building content-driven websites with a powerful admin interface.

## Features

- 🚀 Modern tech stack
- 🎨 Beautiful UI with DaisyUI components
- 🌙 Dark/Light mode support
- 📝 Markdown editor for content
- 🔐 Role-based authentication
- 📱 Responsive design
- 🖼️ Image upload support
- 📊 Admin dashboard

## Prerequisites

### PHP & Composer

#### Windows
1. Install PHP 8.1 or higher:
   - Download PHP from [windows.php.net](https://windows.php.net/download/)
   - Extract to `C:\php`
   - Add `C:\php` to your system's PATH environment variable
   - Rename `php.ini-development` to `php.ini`
   - Enable required extensions in php.ini:
     - extension=pdo_pgsql
     - extension=pgsql
     - extension=fileinfo
     - extension=curl
     - extension=mbstring
     - extension=openssl
     - extension=zip

2. Install Composer:
   - Download and run [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install php8.1 php8.1-cli php8.1-common php8.1-pgsql php8.1-xml php8.1-curl php8.1-mbstring php8.1-zip
```

#### macOS
```bash
brew install php
```

2. Install Composer (Linux/macOS):
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
```

### PostgreSQL

#### Windows
1. Download and install [PostgreSQL](https://www.postgresql.org/download/windows/)
   - Use the interactive installer by EnterpriseDB
   - Remember the password you set for the postgres user
   - Keep the default port (5432)

2. Create database and user:
   - Open SQL Shell (psql) from Start menu
   - When prompted, use default values (press Enter) and enter your postgres password
   ```sql
   CREATE DATABASE launchpad;
   CREATE USER launchpad_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE launchpad TO launchpad_user;
   ```

#### Linux (Ubuntu/Debian)
```bash
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
```

#### macOS
```bash
brew install postgresql
```

Then create database and user:
```sql
CREATE DATABASE launchpad;
CREATE USER launchpad_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE launchpad TO launchpad_user;
```

### Node.js
Install Node.js from [nodejs.org](https://nodejs.org/) (LTS version recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/devin-gray/launchPad_php.git
cd launchpad
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Configure environment:
```bash
# Windows
copy .env.example .env

# Linux/macOS
cp .env.example .env

# Then generate key
php artisan key:generate
```

5. Update `.env` with your database credentials:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=launchpad
DB_USERNAME=launchpad_user
DB_PASSWORD=your_password
```

6. Run migrations and seed the database:
```bash
php artisan migrate
php artisan db:seed
```

7. Generate application key and storage link:
```bash
php artisan key:generate
php artisan storage:link
```

## Running the Application

1. Start the Laravel development server:
```bash
php artisan serve
```

2. In a separate terminal, start the Vite development server:
```bash
npm run dev
```

3. Visit `http://127.0.0.1:8000/` in your browser

## Default Admin Account

Email: admin@example.com
Password: password

## Troubleshooting

### Windows
- If you get SSL errors, download the CA certificate from [curl.se](https://curl.se/ca/cacert.pem) and add this to your php.ini:
  ```ini
  curl.cainfo = "path/to/cacert.pem"
  ```
- If PostgreSQL isn't working, make sure the pgsql extensions are enabled in php.ini
- If `php artisan serve` fails, make sure PHP is in your PATH

### Linux/macOS
- If permissions issues occur, check folder permissions:
  ```bash
  sudo chown -R $USER:$USER .
  chmod -R 755 storage bootstrap/cache
  ```
