from fabric.api import local


def webpack():
    local('rm -rf djreact/static/bundles/stage/*')
    local('rm -rf djreact/static/bundles/prod/*')
    local('webpack --config webpack.stage.config.js --progress --colors')
    local('webpack --config webpack.prod.config.js --progress --colors')
