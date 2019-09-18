import Server from './server';
import { apiconfig } from './apiconfig';


class Api extends Server {
    async getUser() {
        return await this.axios('get', apiconfig.getusers);
        // return result;
    }
}


export default new Api();
