import FormData from 'form-data';

export default class JobsResource {

    constructor(sevenConvert) {
        this.sevenConvert = sevenConvert;
    }

    async get(id, query = null) {
        const response = await this.sevenConvert.axios.get('jobs/' + id, {
            params: query || {}
        });
        return response.data.data;
    }

    async wait(id) {
        const response = await this.sevenConvert.axios.get('jobs/' + id + '/wait');
        return response.data.data;
    }

    async all(query = null) {
        const response = await this.sevenConvert.axios.get('jobs', {
            params: query || {}
        });
        return response.data.data;
    }

    async create(data = null) {
        const response = await this.sevenConvert.axios.post('jobs', data);
        return response.data.data;
    }

    async delete(id) {
        await this.sevenConvert.axios.delete('jobs/' + id);
    }

    async subscribeEvent(id, event, callback) {
        this.sevenConvert.subscribe('private-job.' + id, 'job.' + event, callback);
    }

    async subscribeTaskEvent(id, event, callback) {
        this.sevenConvert.subscribe('private-job.' + id + '.tasks', 'task.' + event, callback);
    }

}
