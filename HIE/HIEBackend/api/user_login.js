function handler(req, res) {
    console.log('API: user_login');
}

module.exports = function(module_holder) {
    module_holder['user_login'] = handler;
};
