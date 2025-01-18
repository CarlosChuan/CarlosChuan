class Configuration {
	API_DOMAIN: string;

	constructor() {
		this.API_DOMAIN = process.env.API_DOMAIN ?? "http://localhost:5000";
	}
}
const configuration = new Configuration();
export default configuration;
