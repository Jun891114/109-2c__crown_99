const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM attendance ORDER BY id desc');
    data = rows;
    // res.json(data);
    res.render('attendance', { data });
  } catch (err) {
    console.log('Errors on getting attendance !');
    res.render('attendance', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  //res.send('display add book page')
  res.render("attendance/add" , {
    ClassName: '',
    AttendanceStatus: '',
    date: '',
  });
});

// add a new book
router.post('/add', async function (req, res, next) {
 // res.send('Add a new book.')
  const ClassName = req.body.ClassName;
  const AttendanceStatus = req.body.AttendanceStatus;
  const date = req.body.date;
  console.log(ClassName,AttendanceStatus,date);

  const form_data = {
    ClassName: ClassName,
    AttendanceStatus: AttendanceStatus,
    date: date,
  };

  try{
    await db.query('INSERT INTO attendance SET ? ' , form_data);
    res.redirect('/attendance');
  }catch(err){
    console.log(err);
    res.render("attendance/add" , {
      ClassName: form_data.ClassName,
      AttendanceStatus: form_data.AttendanceStatus,
      date: form_data.date,
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  //res.send('display edit book page');
  const id = req.params.id;
  try{
  const [rows] = await db.query('SELECT * FROM attendance WHERE id =? ', [id]);
  res.render('attendance/edit' ,{
    id: rows[0].id,
    ClassName:rows[0].ClassName,
    AttendanceStatus: rows[0].AttendanceStatus,
    date: rows[0].date,
  });
  }catch(err){
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
 // res.send('update book data');
 const ClassName = req.body.ClassName;
 const AttendanceStatus = req.body.AttendanceStatus;
 const date = req.body.date;
 const id = req.body.id;
 
 try{
  await db.query('UPDATE attendance SET ClassName = ?, AttendanceStatus = ?, date = ?  where id = ?' ,[
    ClassName,
    AttendanceStatus,
    date,
    id,
  ]);
  //res.status(200).json({message:'Updating successful' });
  res.redirect('/attendance');
 }catch(err){
  console.log(err);
 }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    await db.query('DELETE FROM attendance WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/attendance');
});

module.exports = router;
