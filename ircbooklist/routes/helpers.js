exports.isLoggedIn = (req, res) => {
    if (req.session.currentUser) {
      req.session.flash = {
        type: 'info',
        intro: 'Error!',
        message: 'You are already logged in',
      };
      res.redirect(303, '/');
      return true;
    }
    return false;
  }

  exports.isNotLoggedIn = (req, res) => {
    if (! req.session.currentUser) {
      req.session.flash = {
        type: 'info',
        intro: 'Error!',
        message: 'You are not logged in yet',
      };
      res.redirect(303, '/');
      return true;
    }
    return false;
  }
  