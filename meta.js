module.exports = {
    "prompts": {
        "name": {
            "type": "string",
            "required": false,
            "message": "Project name",
            "default": "mis-vue-startup"
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "version": {
            "type": "string",
            "message": "Project version",
            "default": "0.0.1"
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A new Vue.js project make use of bic-cli"
        },
        "change_state": {
            "type": "confirm",
            "message": "Use state manage for your app?"
        },
        "state": {
            "when": "change_state",
            "type": "list",
            "message": "Pick a state manage",
            "choices": [{
                "name": "Vuex (https://github.com/vuejs/vuex)",
                "value": "vuex",
                "short": "vuex"
            }]
        },
        "change_mock": {
            "type": "confirm",
            "message": "Use mock server for your app?"
        },
        "lint": {
            "type": "confirm",
            "message": "Use eslint for your app?"
        },
        "change_ui": {
            "type": "confirm",
            "message": "Use ui library for your app?"
        },
        "ui": {
            "when": "change_ui",
            "type": "list",
            "message": "Pick a ui library",
            "choices": [{
                "name": "element (https://github.com/ElemeFE/element)",
                "value": "element",
                "short": "element"
            },{
                "name": "iview (https://github.com/iview/iview)",
                "value": "iview",
                "short": "iview"
            }]
        },
        "change_request": {
            "type": "confirm",
            "message": "Use request library for your app?"
        },
        "request": {
            "when": "change_request",
            "type": "list",
            "message": "Pick a request library",
            "choices": [{
                "name": "axios (https://github.com/axios/axios)",
                "value": "axios",
                "short": "axios"
            }]
        },
        "port": {
            "type": "string",
            "required": false,
            "message": "client port",
            "default": 5858
        }
    },
    "filters": {
        "mock/**/*": "change_mock",
        "src/vuex/**/*": "state === 'vuex'"
    },
    "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/58MIS-FE/mis-vue-startup"
}
