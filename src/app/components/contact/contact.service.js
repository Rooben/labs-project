// Create a contact service

function ContactService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  var ref = $firebaseRef.contacts; // Returns the url to our firebase database
  var uid = AuthService.getUser().uid; // Returns the uid of the user
  return {
    createNewContact: function (contact) {
      return $firebaseArray(ref.child(uid)).$add(contact);
    },
    getContactById: function (id) {
      return $firebaseObject(ref.child(uid).child(id));
    },
    getContactList: function () {
      return $firebaseArray(ref.child(uid));
    },
    updateContact: function (contact) {
      return contact.$save();
    },
    deleteContact: function (contact) {
      return contact.$remove();
    }
  };
}

// Register the contact factory under the 'components.contact' module
angular
  .module('components.contact')
  .factory('ContactService', ContactService);
