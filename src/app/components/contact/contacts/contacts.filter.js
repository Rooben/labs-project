// Create a filter function, which will be used to filter the contacts by the filter type chosen ny the user

function contactsFilter() {
  // Return the filter definition function, passing the array of contacts as first parameter (collection) and...
  // passing the second parameter(params) which will represent the filter type being applied.
  return function (collection, params) { // params here, by default would be 'none', because it was set to none by default in the state cnfig params property.
    if(collection){ // Wrap as a security to prevent errors, in case there is no contact created yet.
      // Loop through each contact item in the contacts array, and apply the ES5 filter function to each...
      // which would return a new array of only items whose tag names match the tag name being matched as a filter parameter.
      return collection.filter(function (item) {
        return item.tag === (
                params.filter === 'none' ? item.tag : params.filter // dynamically assign the selected params.filter value
            );
      });
    }

  };
}


//function contactsFilter() {
//  // Return the filter definition function, passing the array of contacts as first parameter (collection) and...
//  // passing the second parameter(params) which will represent the filter type being applied.
//  return function (collection, params) { // params here, by default would be 'none', because it was set to none by default in the state cnfig params property.
//    if(collection){ // Wrap as a security to prevent errors, in case there is no contact created yet.
//      // Loop through each contact item in the contacts array, and apply the ES5 filter function to each...
//      // which would return a new array of only items whose tag names match the tag name being matched as a filter parameter.
//      return collection.filter(function (item) {
//        return item.tag === (
//                params.filter === 'none' ? item.tag : params.filter // dynamically assign the selected params.filter value
//            );
//      });
//    }
//
//  };
//}


angular
  .module('components.contact')
  .filter('contactsFilter', contactsFilter);
