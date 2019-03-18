export = index;
declare class index {
	static SPARQL(template: any, ...args: any[]): any;
	// Circular reference from index
	static SparqlClient: any;
	constructor(endpoint: any, options: any);
	defaultParameters: any;
	requestDefaults: any;
	sparqlRequest: any;
	prefixes: any;
	query(userQuery: any, callback: any): any;
	register(...args: any[]): any;
	registerCommon(...args: any[]): any;
}
