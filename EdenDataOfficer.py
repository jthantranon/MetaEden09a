import models as mm
#from google.appengine.api import users
#import webapp2
import json

from google.appengine.api import users

#import datetime
#import time
#import json
#import random

#from google.appengine.api import channel
#from google.appengine.ext import ndb

cXUSE =  users.get_current_user() #External ID = Google ID

def dictsonify(data):
    if isinstance(data, str):
        return json.dumps(data)
    else:
        return json.dumps(data.to_dict())
    
def jsonify(data):
    return json.dumps(data)

def fetchAllMuseIDs():
    q = []
    muses = mm.MUSE.query().fetch()
    for muse in muses:
        q.append(muse.key.id())
    allMuseIDs = q
    return allMuseIDs    