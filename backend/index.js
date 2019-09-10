const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.use(express.static('dist'));
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/'));

app.get('*', (req, res) => {
    res.render('index', {layout: false});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});