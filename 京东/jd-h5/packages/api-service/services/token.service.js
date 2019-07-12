export default {
    name: 'token',
    service: token
};

function token () {
    return {
        code: localStorage.getItem('lastname'),
        authorization: {
            'authorization': 'Bearer ' + localStorage.getItem('lastname')
        }
    };
}