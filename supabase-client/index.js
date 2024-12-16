
const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://ebixebwcsjtrkypluumw.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViaXhlYndjc2p0cmt5cGx1dW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTg0NTAsImV4cCI6MjA0OTg3NDQ1MH0.JdMnylSVNBgXeLbfWTaajSShNe8fWIvzgxaCsapv9O4';
const supabase = supabaseClient.createClient(supabaseUrl,supabaseKey);


app.get('/clients', async(req, res) => {
    console.log('Attempting to get all clients.');

    const {data, error} = await supabase.from('client').select();

    if (error){
        console.log('Error:', error);
        res.send(error);
    }else{
        console.log('Successfully Retreived Data');
        res.send(data);


    }
    
    

    res.send('Blah');
});

app.post('/client', async (req, res) =>{
    console.log('Attempting to add Client.');
    console.log('Request',req)

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;


    const{data,error} = await supabase
    .from('client')
    .insert({'client_first_name':firstName, 'client_last_name':lastName,'client_email':emai })
    .select();
    
    if (error){
        console.log('Error:', error);
        res.send(error);
    }else{
        console.log('Successfully Retreived Data');
        res.send(data);


    }
});

app.listen(port, () => {
    console.log('App is barking');
});

