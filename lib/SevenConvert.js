import axios from "axios";
import io from 'socket.io-client';
import TasksResource from "./TasksResouce";
import UsersResouce from "./UsersResouce";
import JobsResouce from "./JobsResouce";
import WebhooksResouce from "./WebhooksResouce";

export default class SevenConvert {


    constructor(apiKey, useSandbox = false) {

        this.apiKey = apiKey;
        this.useSandbox = useSandbox;

        this.createAxiosInstance();
        this.createResources();

    }


    createAxiosInstance() {
        this.axios = axios.create({
            baseURL: this.useSandbox ? 'https://api.sandbox.7convert.com.cn/v2/' : 'https://api.7convert.com.cn/v2/',
            headers: {
                'Authorization': 'Bearer ' + this.apiKey,
                'User-Agent': '7convert-node/v2 (https://github.com/7convert/7convert-node)'
            }
        });
    }

    createResources() {
        this.tasks = new TasksResource(this);
        this.jobs = new JobsResouce(this);
        this.users = new UsersResouce(this);
        this.webhooks = new WebhooksResouce(this);
    }


    subscribe(channel, event, callback) {

        if (!this.socket) {
            this.socket = io.connect(this.useSandbox ? 'https://socketio.sandbox.7convert.com.cn' : 'https://socketio.7convert.com.cn', {
                transports: ['websocket']
            });
            this.subscribedChannels = {};
        }

        if (!this.subscribedChannels[channel]) {
            this.socket.emit('subscribe', {
                channel,
                auth: {
                    headers: {
                        'Authorization': 'Bearer ' + this.apiKey
                    }
                },
            });
            this.subscribedChannels[channel] = true;
        }

        this.socket.on(event, function (eventChannel, eventData) {
            if (channel !== eventChannel) {
                return;
            }
            callback(eventData);
        });

    }


}


