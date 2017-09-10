function contactsFilter() {
  return function (collection, params) {
    if(collection){
      return collection.filter(function (item) {
        return item.tag === (
                params.filter === 'none' ? item.tag : params.filter
            );
      });
    }

  };
}

angular
  .module('components.contact')
  .filter('contactsFilter', contactsFilter);
