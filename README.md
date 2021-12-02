# Lowest Price API

Bu proje Yönetim Bilişim Sistemleri bölümü 4. sınıf güz dönemi
mobil programlama dersi için yapılmıştır.

## API Documentation

https://documenter.getpostman.com/view/18301539/UVJeEw1i

## Kullanılan Teknolojiler

[![Nodejs Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![Expressjs Badge](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT Badge](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![MongoDB Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=controlhterms&utm_source=google&utm_campaign=gs_emea_turkey_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624572&adgroup=115749712063&gclid=Cj0KCQiAtJeNBhCVARIsANJUJ2ECMdGd9z9w6YwuZ3gse9yqZeN_PiyMNp_nhHj3qivkhJBzTuYWeBcaAjd1EALw_wcB)
[![Postman Badge](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)](https://www.postman.com/)
[![Docker Badge](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Database Diagram

![database-diagram](database-diagram.png)

## Ortam Değişkenleri

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env dosyanıza eklemeniz gerekecek

`APP_PORT`

`DB_HOST` - `DB_PORT` - `DB_NAME`

`PASSWORD_HASH`

`ACCESS_TOKEN_SECRET_KEY` - `REFRESH_TOKEN_SECRET_KEY`

## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/ysnbyzli/lowest-price-api.git
```

Proje dizinine gidin

```bash
  cd my-project
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Sunucuyu çalıştırın

```bash
  npm run start
```
