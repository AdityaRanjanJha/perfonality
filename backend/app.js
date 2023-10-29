const express = require('express');
const connectDB = require('./config/db');
const calRoute = require('./routes/cal-route');
const app = express();
connectDB();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('API Running');
})

app.use('/api/cal',calRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});