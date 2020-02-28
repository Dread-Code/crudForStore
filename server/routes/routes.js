const express = require('express');

const Product = require('../models/products');

const _ = require('underscore');

const app =express();


app.get('/api/products', function (req,res) {
    
  let since = req.query.since || 0;
  since = Number(since);
  
  let limit = req.query.limit || 5;
  limit = Number(limit);
  

  Product.find({status:true})
         .skip(since)
         .limit(limit)
         .exec((err,productDb)=>{

          if(err){
              return res.status(400).json({
                  ok:false,
                  err
              });
          }

          Product.count({status:true},(err,count)=>{

            res.json({
              ok:true,
              productDb,
              count:count
            });  

          });

          
         });

});


app.get('/api/products/name/:name', function (req,res) { //to get a nime looking for a name 
    
  let name = req.params.name;


  Product.find({name:name})
         .exec((err,productDb)=>{

          if(err){
              return res.status(400).json({
                  ok:false,
                  err
              });
          }

          Product.count({name:name},(err,count)=>{

            res.json({
              ok:true,
              productDb,
              count:count
            });  

          });

          
         });

});

app.post('/api/products',function (req,res) {

  let body = req.body;

  let product = new Product({
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      detail: body.detail,
      imgUrl: body.imgUrl

  });
  
  product.save((err,productDb)=>{

    if (err) {
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok: true,
      product:productDb
    });

  });
});

app.put('/api/products/name/:name',function (req,res){// por nombre

    let name = req.params.name;
    let body = req.body;

    Product.findOneAndUpdate({name:name},body,{new:true, runValidators:true},(err,productDb)=>{

      if (err) {
        return res.status(400).json({
            ok:false,
            err
        });
      }
      res.json({
        ok:true,
        product: productDb
      });
    });
});

app.put('/api/products/:id',function (req,res) { // por id
    
  let id = req.params.id;
  let body = req.body;// arreglo de las opciones que si se puedan actualizar

  Product.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,productDb)=>{ // encuentra el id y lo actualiza
      // new genera el nuevo objeto // run validator corre todos las validaciones del sistema
      if (err) {
          return res.status(400).json({
              ok:false,
              err
          });
      }
      
      res.json({
          ok: true,
          usuario: productDb
      });
      
  });
  
});

app.delete('/api/products/:id',function (req,res) { 
    
  let id = req.params.id;
  let status = {
    status:false
  }

  Product.findByIdAndUpdate(id,status,{new:true},(err,productDb)=>{ 
      if (err) {
          return res.status(400).json({
              ok:false,
              err
          });
      }
    //   if (productDb.status=true) {
            
    //     return res.status(400).json({

    //         ok:false,
    //         err:{
                
    //             message: 'Usuario no encontrado'

    //         }
            
    //     })
    // }
      
      res.json({
          ok: true,
          productDb
      });
      
  });
  
});



module.exports = app;