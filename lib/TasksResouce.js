import FormData from 'form-data';

export default class TasksResource {

    constructor(sevenConvert) {
        this.sevenConvert = sevenConvert;
    }

    async get(id, query = null) {
        const response = await this.sevenConvert.axios.get('tasks/' + id, {
            params: query || {}
        });
        return response.data.data;
    }

    async wait(id) {
        const response = await this.sevenConvert.axios.get('tasks/' + id + '/wait');
        return response.data.data;
    }

    async all(query = null) {
        const response = await this.sevenConvert.axios.get('tasks', {
            params: query || {}
        });
        return response.data.data;
    }

    async create(operation, data = null) {
        const response = await this.sevenConvert.axios.post(operation, data);
        return response.data.data;
    }

    async delete(id) {
        await this.sevenConvert.axios.delete('tasks/' + id);
    }

    async upload(task, stream) {

        if (task.operation !== 'import/upload') {
            throw new Error('The task operation is not import/upload');
        }

        if (task.status !== 'waiting' || !task.result || !task.result.form) {
            throw new Error('The task is not ready for uploading');
        }

        const formData = new FormData();

        for (const parameter in task.result.form.parameters) {
            formData.append(parameter, task.result.form.parameters[parameter]);
        }

        formData.append("file", stream);

        return await this.sevenConvert.axios.post(task.result.form.url, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: null
            }
        });

    }

    async subscribeEvent(id, event, callback) {
        this.sevenConvert.subscribe('private-task.' + id, 'task.' + event, callback);
    }


}
