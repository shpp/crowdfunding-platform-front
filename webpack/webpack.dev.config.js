module.exports = function (env) {
    return Object.assign(
        {},
        require('./webpack.default.config')(env),
        {
            devtool: 'cheap-eval-source-map'
        }
    );
};