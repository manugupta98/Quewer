const express = require('express');
const cors = require('cors');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const MongoStore = require('connect-mongo');
const admin = require('firebase-admin');

const User = require('./models/user');
const userRouter = require('./api/routes/user');
const authRouter = require('./api/routes/auth');
const courseRouter = require('./api/routes/course');
const questionRouter = require('./api/routes/question');
const answerRouter = require('./api/routes/answer');
const announcmentRouter = require('./api/routes/announcment');
const dashboardRouter = require('./api/routes/dashboard');
const feedbackRouter = require('./api/routes/feedback');
const { session } = require('passport');

const isDev = process.env.NODE_ENV !== 'production';

if (isDev){
  const dotenv = require('dotenv').config();
  if (dotenv.error){
    console.log(dotenv.error)
  }
}

const PORT = process.env.PORT || 5000;

if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {

  var uri = process.env.DB_URI;

  var mongooseConnection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).catch((err) => {
    console.error(err);
  })

  let firebaseConfig = {
    credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.CLIENT_EMAIL,
    }),
    databaseURL: process.env.DATABASE_URL,
};
admin.initializeApp(firebaseConfig);



  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    let type = 'teacher';
    let regExp = new RegExp('(([f]{1}\d{8})|([h]{1}\d{11}))[@][a-zA-Z0-9\.-]*');
    if (!profile.emails[0].value.match(regExp)){
      type = 'student';
    }
    User.findOrCreate({
      googleId: profile.id,
      displayName: profile.displayName,
      name: profile.name,
      type: type,
      emails: profile.emails,
      photos: profile.photos,
    }).then((user) => {
      return done(null, user);
    }).catch((err) => {
      return done(err, null);
    });
  }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.googleId);
  });
  
  passport.deserializeUser(function(googleId, done) {
    User.find({googleId: googleId}, function (err, user) {
      done(err, user[0]);
    });
  });

  const app = express();
  app.disable("x-powered-by");
  app.use(require('serve-static')(__dirname + '/../../public'));
  app.use(require('cookie-parser')());
  app.use(cors({ origin: true, credentials: true, }));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(require('express-session')({
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
      dbName: 'quewer',
      ttl: 7 * 24 * 60 * 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../quewer-frontend/build')));

  // Answer API requests.

  app.use("/api", userRouter);
  app.use("/api", authRouter);
  app.use("/api", courseRouter);
  app.use("/api", questionRouter);
  app.use("/api", answerRouter);
  app.use("/api", announcmentRouter);
  app.use("/api", dashboardRouter);
  app.use("/api", feedbackRouter);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../quewer-frontend/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}