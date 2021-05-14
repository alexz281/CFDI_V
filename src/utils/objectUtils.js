export const getDescendantProperty = function(object, descendantProperty) {
    var descendantProperties = descendantProperty.split(".");
    
    while(descendantProperties.length && (object)) {
        object = object[descendantProperties.shift()];
    }
    
    return object;
};