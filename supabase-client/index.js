
const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://ebixebwcsjtrkypluumw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViaXhlYndjc2p0cmt5cGx1dW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTg0NTAsImV4cCI6MjA0OTg3NDQ1MH0.JdMnylSVNBgXeLbfWTaajSShNe8fWIvzgxaCsapv9O4';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('INST377_Group_Project/public/Contact.html', { root: __dirname });
});

app.get('/customers', async (req, res) => {
  console.log('Attempting to get all customers.');

  const { data, error } = await supabase.from('customer').select();

  if (error) {
    console.log('Error:', error);
    res.send(error);
  } else {
    console.log('Successfully Retrieved Data');
    res.send(data);
  }
});

app.post('/customer', async (req, res) => {
  console.log('Attempting to add Customer.');
  console.log('Request', req.body);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;


  const { data, error } = await supabase
    .from('customer')
    .insert({
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_email: email,
    })
    .select();

  if (error) {
    console.log('Error:', error);
    res.send(error);
  } else {
    console.log('Successfully Retrieved Data');
    res.send(data);
  }
});
/*
app.listen(port, () => {
  console.log('App is ALIVEEEEEE');
});
*/

module.exports = app;