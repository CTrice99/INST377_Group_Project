
const express = require('express')
const supabaseClient = require('@supabase/supabase-js')


const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://ebixebwcsjtrkypluumw.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViaXhlYndjc2p0cmt5cGx1dW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTg0NTAsImV4cCI6MjA0OTg3NDQ1MH0.JdMnylSVNBgXeLbfWTaajSShNe8fWIvzgxaCsapv9O4'
const supabase = supabaseClient.createClient(supabaseUrl,supabaseKey);


app.get('/clients', (req, res) => {
    console.log('Attempting to get all clients.')
    res.send('Blah')
})

app.post('/client', (req, res) =>{
    console.log('Attempting to add Client.')
    res.send('Blah')
})

app.listen(port, () => {
    console.log('App is barking')
})

