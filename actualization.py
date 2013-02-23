import webapp2
import EdenCIC as cic
#import json

from google.appengine.api import users

cXUSE =  users.get_current_user() #External ID = Google ID

class Immigration(webapp2.RequestHandler):
    def get(self):
        if cXUSE:   self.Customs()
        else:       self.xLogin()
    def xLogin(self):
        self.redirect(users.create_login_url("/"))
    def Customs(self):
        cMUSE = cic.lMUSE()
        if cMUSE:   self.response.out.write(cMUSE)
        else:       self.response.out.write('No use for a name.')

app = webapp2.WSGIApplication([('/', Immigration),
                               ],
                              debug=True) 