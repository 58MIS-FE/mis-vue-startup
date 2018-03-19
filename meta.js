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
            "default": "A new Vue.js project make use of mis-cli"
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
        "src/vuex/**/*": "state === 'vuex'"
    },
    "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/58MIS-FE/mis-vue-startup"
}