// Create a contact service

function ContactService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  var ref = $firebaseRef.contacts; // Returns the reference to the url to which restful requests will be made.
  var uid = AuthService.getUser().uid; // Returns the uid of the user, stored in memory in the the Authservice.
  return {
    createNewContact: function (contact) {
      return $firebaseArray(ref.child(uid)).$add(contact); // Create a new contact in firebase, using the contact passed in.
    },
    getContactById: function (id) {
      return $firebaseObject(ref.child(uid).child(id)); // Pass in the id extracted from the contact-edit route params.
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
