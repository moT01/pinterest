import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true 
  },
  profile_image_url: {
    type: String
  },
  email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      },
      twitterProvider: {
        type: {
          id: String,
          token: String
        },
        select: false
      }
});

userSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    var that = this;
    return this.findOne({
      'twitterProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          username: profile.username,
          profile_image_url: profile._json.profile_image_url,
          email: profile.emails[0].value,
          twitterProvider: {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
};

module.exports = mongoose.model('userModel', userSchema);
