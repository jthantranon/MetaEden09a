from models import MUSE,ECHO,ORB,NODE
import EdenDataOfficer as edo 
from google.appengine.api import users
from google.appengine.ext import ndb
import webapp2
#from models import *
#import json
#import EdenDataOfficer as edo
#import EdenUniCon as euc
#import datetime
#import time
#import json
#import random
#from google.appengine.api import channel

cXUSE =  users.get_current_user() #External ID = Google ID

def lMUSE(cXUSE=users.get_current_user()):
    return MUSE.query(MUSE.xID == cXUSE.user_id()).get()

class Eden(webapp2.RequestHandler):
    def ECHO1(self):
        echo1 = ndb.Key('ECHO','1').get()
        if echo1:
            self.response.out.write(edo.dictsonify(echo1))
        else:
            echo1 = ECHO(id='1',name='Eden Crystal Helix Operator One',info='The Tree of Wisdom.',uCount=0,evekey='adam')
            echo1.put()
    
    def ORB1(self):
        orb1 = ndb.Key('ORB','1').get()
        if orb1:
            self.response.out.write(edo.dictsonify(orb1))
        else:
            orb1 = ORB(id='1',name='Pandora\'s Box')
            orb1.put()
            
    def NODE1(self):
        node1 = ndb.Key('NODE','1').get()
        if node1:
            self.response.out.write(edo.dictsonify(node1))
        else:
            node1 = NODE(id='1',name='MetaEden Central Node',info='The center of it all.')
            node1.put()
    def get(self):
        self.ECHO1()
        self.ORB1()
        self.NODE1()

app = webapp2.WSGIApplication([('/eden', Eden),
                               ],
                              debug=True) 