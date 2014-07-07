module.exports = function (app) { // async
    var passport = require('passport'), // login strategies
        session = require('express-session'), // express sessions
        store = require('connect-mongo')(session); // persist sessions
    require('mongoose').connect('mongodb://localhost:27017/ktpweb'); // connect to our database
    require('./passport.js')(passport); // declare handling login and serialization
    app.set('views',__dirname+'/views'); // use jade templating engine 
    app.set('view engine','jade'); // we only template the authenticated section of the website
    app.use(require('cookie-parser')()); // sessions are persisted with the help of cookies 
    app.use(require('body-parser').urlencoded({extended:true})); // allow urlencoded form input
    app.use(session({ 
        secret: 'justinLikesTenticles', // salt the cookies
        store: new store({              // place on 2'x2' baking sheet
            db: 'ktpweb'                // bake on high for 30 minutes
        }) 
    }));
    app.use(passport.initialize()); // initialize passport
    app.use(passport.session()); // link passport with our sessions
    app.use(require('connect-flash')()); // flash message login errors
    require('./routes.js')(app,passport); // route handling for authenticated portion of website
}