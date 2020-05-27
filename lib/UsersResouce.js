export default class UsersResouce {

    constructor(sevenConvert) {
        this.sevenConvert = sevenConvert;
    }

    async me() {
        const response = await this.sevenConvert.axios.get('users/me');
        return response.data.data;
    }

    async subscribeJobEvent(id, event, callback) {
        this.sevenConvert.subscribe('private-user.' + id + '.jobs', 'job.' + event, callback);
    }

    async subscribeTaskEvent(id, event, callback) {
        this.sevenConvert.subscribe('private-user.' + id + '.tasks', 'task.' + event, callback);
    }

}
