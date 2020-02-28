//==========================
//Connect to Port
//==========================

process.env.PORT = process.env.PORT || 3000;

//======================
// ENTORNO
//======================

process.env.NODE_ENV = process.env.NODE_ENV ||'dev';

//======================
// BASE DE DATOS
//======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/dbstore';
}else{
    urlDB = 'mongodb+srv://lucas:iUgQI6ekkeKTUWts@cluster0-hcdpy.mongodb.net/dbstore';
}

process.env.urlDB =urlDB;