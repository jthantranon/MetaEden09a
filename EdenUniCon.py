from models import MUSE
from google.appengine.api import users
from google.appengine.ext import ndb
#import webapp2
#from models import *
#import json
#import EdenDataOfficer as edo
#import datetime
#import time
#import json
#import random
#from google.appengine.api import channel


cXUSE =  users.get_current_user() #External ID = Google ID

def aMUSE():
    #TODO: Whenever a Sprite is made, record it somewhere, even if it's just dumped for history sake.
    Echo1 = ndb.Key('ECHO','1').get()
    Echo1.uCount += 1
    Echo1.put()
    newID = str(Echo1.uCount)
    muse = MUSE(id=newID,xID = cXUSE.user_id())
    muse.tutorial = 0
    muse.name = muse.kid
    muse.put()
    return muse