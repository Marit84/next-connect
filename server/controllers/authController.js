const mongoose = require ('mongoose');
const { restart } = require('nodemon');
const user = mongoose.model('User');
const passport = require ('passport';)

exports.validateSignup = (req, res, next) => {
    req.sanitizeBody('name'),
    req.sanitizeBody('email'),
    req.sanitizeBody('password')

    //name is non-null and is 4 to 10 characters

    req.checkBody('name','Enter a name').notEmpty();
    req.checkBody('name', 'Name must be between 4 and 10 character').isLength({min: 4, max: 10});

    //email is not null, valid, and normalized

    req.checkBody('email', 'Enter a valid email')
    .isEmail()
    .normalizeEmail();

      //password must be non-null and is 4 to 10 characters

      req.checkBody('password','Enter a password').notEmpty();
      req.checkBody('password', 'Password must be between 4 and 10 character').isLength({min: 4, max: 10});

      //check for errors and send first error
      const errors = req.valdiationErrors();
      if(errors) {
          const firstError = errors.map(error => error.msg)[0];
          return res.status(400).send(firstError);
      }
      next();
};

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    const user = await new User ({ name, email, password })
    await User.registrer(user, password, (err, user) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(user);
    });
};

exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json(err.message)
        }
        if (!user) {
            return res.status(400).json(info.message)
        }

        req.logIn(user, err => {
            if (err) {
                return res.status(500).json(err.message)            
            }

            res.json(user)
        })
    })(req, res, next);
};

exports.signout = () => {};

exports.checkAuth = () => {};
