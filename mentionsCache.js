function ChatCache(chatID) {
  this.chatID = chatID;
  this.cache = {};
}

var nameToKey = function(name) {
  return name.toLowerCase();
}

ChatCache.prototype.addFullName = function(name, userID) {
  var key = nameToKey(name);
  this.cache[key] = userID;
}

ChatCache.prototype.getSize = function() {
  return Object.keys(this.cache).length;
}

ChatCache.prototype.getAllIDs = function() {
    var cache = this.cache;
    return Object.keys(this.cache).map(function (key) {
        return cache[key];
    });
}

ChatCache.prototype.getIDByFirstName = function(name) {
  var matchCount = 0;
  var match;
  for (var fullName in this.cache) {
    if (!this.cache.hasOwnProperty(fullName))
      continue;

    if (fullName.split(" ")[0] == name) {
      matchCount++;
      match = this.cache[fullName];
    }
  }

  // Only match on first name if the first name is unambiguous
  if (matchCount == 1)
    return match;
  return null;
}

ChatCache.prototype.getID = function(name) {
  var fullNameKey = nameToKey(name);
  if (this.cache[fullNameKey])
    return this.cache[fullNameKey];

  var firstName = nameToKey(name.split(" ")[0]);
  return this.getIDByFirstName(firstName);
}

var MentionsCache = function() {
  this.cache = {}
}

MentionsCache.prototype.addToCache = function(chatID, name, userID) {
  if (!this.cache[chatID]) {
    this.cache[chatID] = new ChatCache(chatID);
  }
  return this.cache[chatID].addFullName(name, userID);
}

MentionsCache.prototype.getID = function(chatID, name) {
  if (this.cache[chatID])
    return this.cache[chatID].getID(name);
  return null;
}

MentionsCache.prototype.getSize = function(chatID) {
    if (this.cache[chatID])
      return this.cache[chatID].getSize();
    return 0;
}

MentionsCache.prototype.getAllIDs = function(chatID) {
    if (this.cache[chatID])
      return this.cache[chatID].getAllIDs();
    return [];
}
module.exports.MentionsCache = MentionsCache;
