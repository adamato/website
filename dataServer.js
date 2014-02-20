var express = require("express"),
    app     = express();
    
app.use(express.directory('data'));
app.use(express.static('data'));

app.listen(6969);