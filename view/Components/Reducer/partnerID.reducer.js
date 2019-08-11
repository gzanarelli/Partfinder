export default function (partnerID = '', action) {
    if (action.type === 'addID') {
        partnerID = action.iD;
        return partnerID;
    } else {
        return partnerID;
    }
};