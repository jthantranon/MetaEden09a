from models import MUSE,ORB,PULSE
from google.appengine.api import users
from google.appengine.api import channel
from google.appengine.ext import ndb

import webapp2
import EdenDataOfficer as edo
import EdenUniCon as euc

#import datetime
#import time
#import json
#import random

cXUSE =  users.get_current_user() #External ID = Google ID

def lMUSE(cXUSE=users.get_current_user()):
    return MUSE.query(MUSE.xID == cXUSE.user_id()).get()

def lORB():
    return ndb.Key('ORB','1').get()

class Immigration(webapp2.RequestHandler):
    def get(self):
        if cXUSE:   self.Customs()
        else:       self.xLogin()
    def xLogin(self):
        self.redirect(users.create_login_url("/"))
    def Customs(self):
        cMUSE = lMUSE()
        cORB = lORB()
        if cMUSE:
            pulse = PULSE()
            pulse.content = 'stuff'
            pulse.console = 'it worked'
            pulse.send('system')
            self.response.out.write(edo.dictsonify(cMUSE))
        else:
            muse = euc.aMUSE()
            self.response.out.write(edo.dictsonify(muse))

class NewSession(webapp2.RequestHandler):
    def get(self):
        cMUSE = lMUSE()
        token = channel.create_channel(str(cMUSE.key.id()),1440)
        
        self.response.out.write(edo.jsonify(token))

class IncrementTutorial(webapp2.RequestHandler):
    def post(self):
        cMUSE = lMUSE()
        cMUSE.tutorial += 1
        cMUSE.put()
        self.response.out.write(edo.dictsonify(cMUSE))
        
app = webapp2.WSGIApplication([
                               ('/cic/newSession', NewSession),
                               ('/cic/incTutorial', IncrementTutorial),
                               ('/cic/immigration', Immigration),
                               ],
                              debug=True) 