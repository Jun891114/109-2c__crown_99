const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const response = await  fetch('http://localhost:1337/material');
    const data = await response.json();
    // console.log('data' , data);
    res.render('apiMaterial/index', { data });
  } catch (err) {
    console.log('Errors on getting material !');
    res.render('apiMaterial/index', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  //res.send('display add book page')
  res.render("apiMaterial/add" , {
    ClassName: '',
    Material_Name: '',
  
  });
});

// add a new book
router.post('/add', async function (req, res, next) {
 // res.send('Add a new book.')
  const ClassName = req.body.ClassName;
  const Material_Name = req.body.Material_Name;
  console.log(ClassName,Material_Name);

  const form_data = {
    ClassName: ClassName,
    Material_Name: Material_Name,
  };

  try{
    const response = await fetch('http://localhost:1337/material',{
      method: 'post',
      body: JSON.stringify(form_data),
      headers: { 'Content-Type': 'application/json'},
  })
const data = await response.json();
res.redirect('/apiMaterial');
  }catch(err){
    console.log(err);
    res.render("apiMaterial/add" , {
      ClassName: form_data.ClassName,
      Material_Name: form_data.Material_Name,
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  //res.send('display edit book page');
  const id = req.params.id;
  try{
    const response = await  fetch(`http://localhost:1337/material/${id}`);
    const data = await response.json();
  res.render('apiMaterial/edit' ,{
    id: data.id,
    ClassName:data.ClassName,
    Material_Name: data.Material_Name,
  });
  }catch(err){
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
 // res.send('update book data');
 const ClassName = req.body.ClassName;
 const Material_Name = req.body.Material_Name;
 const id = req.body.id;
 
 const form_data = {
  ClassName: ClassName,
  Material_Name: Material_Name,
};

 try{
  const response = await  fetch(`http://localhost:1337/material/${id}`,{
    method: 'put',
    body: JSON.stringify(form_data),
    headers: { 'Content-Type': 'application/json'},
 });
  const data = await response.json();
  //res.status(200).json({message:'Updating successful' });
  res.redirect('/apiMaterial');
 }catch(err){
  console.log(err);
 }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    const response = await  fetch(`http://localhost:1337/material/${id}`,{
      method: 'delete',
    });
    const data = await response.json();

  res.redirect('/apiMaterial');
  } catch (err) {
    console.log(err);
  }
  res.redirect('/material');

});

module.exports = router;
