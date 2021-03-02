
function addEqQuery(filterObject, attribute, value) {
    filterObject[attribute] = value;
}

function addAndQuery(filterObject, ...conditions) {
    filterObject.$and = [...conditions]
}

function appendAndQuery(filterObject, newCondition) {

    if (filterObject.$and) {
        filterObject.$and.push(newCondition)
        return filterObject
    } else {
        let appendedFilterObject = {}
        appendedFilterObject.$and = [filterObject, newCondition];
        return appendedFilterObject
    }
}

module.exports.addEqOperator = addEqQuery;
module.exports.addAndQuery = addAndQuery;
module.exports.appendAndQuery = appendAndQuery;
