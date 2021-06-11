const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM material ORDER BY id desc');
    data = rows;
    // res.json(data);
    res.render('material', { data });
  } catch (err) {
    console.log('Errors on getting material !');
    res.render('material', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  //res.send('display add book page')
  res.render("material/add" , {
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
    await db.query('INSERT INTO material SET ? ' , form_data);
    res.redirect('/material');
  }catch(err){
    console.log(err);
    res.render("material/add" , {
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
  const [rows] = await db.query('SELECT * FROM material WHERE id =? ', [id]);
  res.render('material/edit' ,{
    id: rows[0].id,
    ClassName:rows[0].ClassName,
    Material_Name: rows[0].Material_Name,
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
 
 try{
  await db.query('UPDATE material SET ClassName = ?, Material_Name = ?  where id = ?' ,[
    ClassName,
    Material_Name,
    id,
  ]);
  //res.status(200).json({message:'Updating successful' });
  res.redirect('/material');
 }catch(err){
  console.log(err);
 }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    await db.query('DELETE FROM material WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/material');
});

module.exports = router;
