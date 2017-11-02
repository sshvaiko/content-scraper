const config = {
  url: 'http://shirts4mike.com/shirts.php',
  folder: './data/',
  error: './scraper-error.log',
  fields: ['Title', 'Price', 'ImageURL', 'URL', 'Time']
}

module.exports = config;
