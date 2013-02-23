from google.appengine.ext import ndb
from google.appengine.api import channel
import EdenDataOfficer as edo
import json
#import EdenInformationControl as eic
class Mobility():
    def north(self):
        self.y += 1
        self.put()
        return self.y
    def south(self):
        self.y -= 1
        self.put()
        return self.y
    def east(self):
        self.x += 1
        self.put()
        return self.y
    def west(self):
        self.x -= 1
        self.put()
        return self.y
    def up(self):
        self.z += 1
        self.put()
        return self.y
    def down(self):
        self.z -= 1
        self.put()
        return self.y

class Perception():
    def OtherMusesHere(self):
        q = MUSE.query(MUSE.x == self.x,).fetch()
        museIDs = []
        for muse in q:
            if muse.key.id() == self.key.id():
                pass
            else:
                museIDs.append(muse.key.id())
        return museIDs

class PULSE(ndb.Expando):
    initiator = ndb.StringProperty()
    sender = ndb.StringProperty()
    destination = ndb.StringProperty()
    title = ndb.StringProperty()
    content = ndb.StringProperty()
    console = ndb.StringProperty()
    def send(self,scope):
        if scope == 'system':
            chanTargets = edo.fetchAllMuseIDs()
        for chanTarget in chanTargets:
            channel.send_message(str(chanTarget),edo.dictsonify(self))



class META(ndb.Model):
    #GENERAL PROPS
    name = ndb.StringProperty(default = 'Anon')
    info = ndb.StringProperty()
    kind = ndb.ComputedProperty(lambda self: self._get_kind())
    kid = ndb.ComputedProperty(lambda self: self._get_kind()+self.key.id())
    #LOCATION PROPS
    x = ndb.IntegerProperty(default=500)
    y = ndb.IntegerProperty(default=500)
    z = ndb.IntegerProperty(default=500)
    l = ndb.IntegerProperty(default=0)
    node = ndb.ComputedProperty(lambda self: str(self.x)+'.'+str(self.y)+'.'+str(self.z)+':'+str(self.l))
    rawNode = ndb.ComputedProperty(lambda self: str(self.x)+str(self.y)+str(self.z)+str(self.l))
    container = ndb.StringProperty()
    @ndb.ComputedProperty
    def nodeMeta(self):
        if self.kind == 'NODE':
            return 'This IS a Node META.'
        else:
            q = NODE.query(NODE.x == self.x,
                           NODE.y == self.y,
                           NODE.z == self.z,
                           NODE.l == self.l).get()
            if q:
                return q.to_dict()
            else:
                return 'boo'
    @ndb.ComputedProperty
    def OtherMusesHere(self):
        q = MUSE.query(
                       MUSE.x == self.x,
                       MUSE.y == self.y,
                       MUSE.z == self.z,
                       MUSE.l == self.l,).fetch()
        museIDs = []
        for muse in q:
            if muse is self:
                pass
            else:
                museIDs.append(str(muse.key.id())+'.'+muse.name)
        return museIDs
    @ndb.ComputedProperty
    def OrbsHere(self):
        q = ORB.query(
                       ORB.x == self.x,
                       ORB.y == self.y,
                       ORB.z == self.z,
                       ORB.l == self.l,).fetch()
        orbIDs = []
        for orb in q:
            orbIDs.append(str(orb.key.id())+'.'+orb.name)
        return orbIDs

class NODE(ndb.Expando,META):
    exits = ndb.StringProperty()        

class MUSE(ndb.Expando,META,Mobility,Perception):
    xID = ndb.StringProperty()
    tutorial = ndb.IntegerProperty(default=0)
    

class ECHO(ndb.Expando,META):
    uCount = ndb.IntegerProperty(default=0)
    eveKey = ndb.StringProperty('adam')


    
class ORB(ndb.Expando,META):
    def pickup(self,who):
        self.container = who.kid
        self.put()
    def drop(self,who):
        self.container = ''
        self.x = who.x
        self.y = who.y
        self.z = who.z
        self.l = who.l
        self.put()
        

#class Crystal(ndb.Expando):
#    metakind = ndb.StringProperty()
#    crystalclass = ndb.StringProperty()
#    name = ndb.StringProperty()
#    info = ndb.StringProperty()
#    primertype = ndb.StringProperty() 
#    shardtype = ndb.StringProperty()
#    fragtype = ndb.StringProperty()
#    itype = ndb.StringProperty()
#    cowner = ndb.StringProperty()
#    xloc = ndb.StringProperty()
#    yloc = ndb.StringProperty()
#    zloc = ndb.StringProperty()
#    lattice = ndb.StringProperty()
#    sysacts = ndb.ComputedProperty(lambda self: self.actions.split(','),repeated=True)
#
#class Blueprint(ndb.Expando):
#    metakind = ndb.StringProperty()
#    bpclass = ndb.StringProperty()
#    name = ndb.StringProperty()
#    info = ndb.StringProperty()
#    primertype = ndb.StringProperty() 
#    shardtype = ndb.StringProperty()
#    fragtype = ndb.StringProperty()
#    cowner = ndb.StringProperty()
#    xloc = ndb.StringProperty()
#    yloc = ndb.StringProperty()
#    zloc = ndb.StringProperty()
#    lattice = ndb.StringProperty()
#
#class Location(ndb.Expando):
#    metakind = ndb.StringProperty(default='Location')
#    name = ndb.StringProperty()
#    info = ndb.StringProperty()
#    xloc = ndb.StringProperty()
#    yloc = ndb.StringProperty()
#    zloc = ndb.StringProperty()
#    lattice = ndb.StringProperty()
#    exits = ndb.StringProperty(default='n,s,e,w')      
#    @ndb.ComputedProperty
#    def xyz(self):
#        if self.xloc:
#            return self.xloc+"."+self.yloc+"."+ self.zloc+":"+self.lattice
#        else:
#            return 'Limbo'
##    @ndb.ComputedProperty
##    def metaid(self):
##        try:
##            return self.key.id()
##        except AttributeError:
##            return 'Zero'
#    @ndb.ComputedProperty
#    def kid(self):
#        if self.metakind:
#            return self.metakind+str(self.xloc+self.yloc+self.zloc+self.lattice)
#        else:
#            return 'No kid(ding).'
#    
#
#class Medo(ndb.Expando):
#    medotype = ndb.StringProperty()
#    name = ndb.StringProperty()
#    info = ndb.TextProperty()
#    stuff = ndb.StringProperty()
#    
#class Item(ndb.Expando):
#    metakind = ndb.StringProperty(default='Item')
#    name = ndb.StringProperty(default='Indescript Medo')
#    info = ndb.TextProperty(default='An Indescript Medo')
#    actions = ndb.StringProperty(default='')
#    itype = ndb.StringProperty(default='Unknown')
#    primertype = ndb.StringProperty() 
#    shardtype = ndb.StringProperty()
#    fragtype = ndb.StringProperty()
#    cowner = ndb.StringProperty(default='Location5005005000')
#    cokind = ndb.StringProperty(default='Location')
#    coid = ndb.StringProperty(default='5005005000')
#    xloc = ndb.StringProperty(default='500')
#    yloc = ndb.StringProperty(default='500')
#    zloc = ndb.StringProperty(default='500')
#    lattice = ndb.StringProperty(default='0')
#    databits = ndb.IntegerProperty(default=0)
#    databitsString = ndb.StringProperty(default='0') #TODO: Create computed property
#    suptype = ndb.StringProperty()
#    regtype = ndb.StringProperty()
#    subtype = ndb.StringProperty()
#    ispopup = ndb.BooleanProperty(default=False)
#    actionlist = ndb.ComputedProperty(lambda self: self.actions.split(','),repeated=True)
##    @ndb.ComputedProperty
##    def actionlist(self):
##        alist = self.actions
##        return alist.split(',')
#    @ndb.ComputedProperty
#    def xyz(self):
#        if self.xloc:
#            return self.xloc+"."+self.yloc+"."+ self.zloc+":"+self.lattice
#        elif self.cowner:
#            return self.cowner
#        else:
#            return 'Limbo'
#    @ndb.ComputedProperty
#    def kid(self):
#        try:
#            return self.metakind+str(self.metaid)
#        except AttributeError:
#            return 'No kid(ding).'
#    
#
#class Meta(ndb.Expando):
#    metakind = ndb.StringProperty(default='Meta')
#    metaid = ndb.IntegerProperty()
#    name = ndb.StringProperty()
#    info = ndb.StringProperty()
#    masterid = ndb.StringProperty()
#    xloc = ndb.StringProperty(default='500')
#    yloc = ndb.StringProperty(default='500')
#    zloc = ndb.StringProperty(default='500')
#    lattice = ndb.StringProperty(default='0')
#    databits = ndb.IntegerProperty(default=0)
#    @ndb.ComputedProperty
#    def xyz(self):
#        if self.xloc:
#            return self.xloc+"."+self.yloc+"."+ self.zloc+":"+self.lattice
#        else:
#            return 'Limbo'
#    @ndb.ComputedProperty
#    def xyzraw(self): #need to deprecate, use coid instead
#        if self.xloc:
#            return self.xloc+self.yloc+ self.zloc+self.lattice
#        else:
#            return 'Limbo'
#    @ndb.ComputedProperty
#    def kid(self):
#        if self.metakind:
#            return self.metakind+str(self.metaid)
#        else:
#            return 'No kid(ding).'
#    @ndb.ComputedProperty
#    def coid(self): #duplicate of xyzraw
#        if self.xloc:
#            return self.xloc+self.yloc+ self.zloc+self.lattice
#        else:
#            return 'Limbo'
#    @ndb.ComputedProperty
#    def cokid(self): #duplicate of xyzraw
#        if self.xloc:
#            return 'Location'+self.xloc+self.yloc+ self.zloc+self.lattice
#        else:
#            return 'Limbo'
#    @ndb.ComputedProperty
#    def locname(self):
#        cloc = ops.loadcloc()
#        return cloc.name
#
#class Base(ndb.Expando):
#    name = ndb.StringProperty()
#    info = ndb.StringProperty()
#    xloc = ndb.StringProperty()
#    yloc = ndb.StringProperty()
#    zloc = ndb.StringProperty()
#    lattice = ndb.StringProperty()
#
#class Social(ndb.Expando):
#    name = ndb.StringProperty()
#    info = ndb.StringProperty()
#    xloc = ndb.StringProperty()
#    yloc = ndb.StringProperty()
#    zloc = ndb.StringProperty()
#    lattice = ndb.StringProperty()
#    
#class Packet(ndb.Expando):
#    type = ndb.StringProperty()
#    content = ndb.StringProperty()