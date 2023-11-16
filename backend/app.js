const express = require('express');
const connectDB = require('./config/db');
const calRoute = require('./routes/cal-route');
const userRoute = require('./routes/user-route');
const path = require('path');

const app = express();
connectDB();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    // res.send('API Running');
    res.render("index")
})

app.use('/api/users',userRoute)
app.use('/api/cal',calRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});