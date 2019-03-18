import { Component, OnInit } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	private sparkqlData = "null";
	selected = '';
	selected2 = '';

	public consultas = [
		{
			nombre: 'Nivel de educación',
			value: 'nivel',
			sql: 'http://206.189.215.246:8890/sparql?default-graph-uri=&query=select+distinct+*%0D%0A++where+%7B%0D%0A++++%3Fres+rdf%3Atype+%3Chttp%3A%2F%2Fsbc.utpl%2Fontology%23Estudiante%3E+.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2FeducationLevel%3E+%3Fr+.%0D%0A++%7D+%0D%0A&format=text%2Fhtml&timeout=0&debug=on'
		},
		{
			nombre: 'Género',
			value: '',
			sql: 'http://206.189.215.246:8890/sparql?default-graph-uri=&query=select+distinct+*%0D%0A++where+%7B%0D%0A++++%3Fres+rdf%3Atype+%3Chttp%3A%2F%2Fsbc.utpl%2Fontology%23Estudiante%3E+.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fschema.org%2Fgender%3E+%3Fgenero+.%0D%0A++++%0D%0A++%7D&format=text%2Fhtml&timeout=0&debug=on'
		},
		{
			nombre: 'Género y edad',
			value: 'generoedad',
			sql: 'http://206.189.215.246:8890/sparql?default-graph-uri=&query=select+distinct+*%0D%0A++where+%7B%0D%0A++++%3Fres+rdf%3Atype+%3Chttp%3A%2F%2Fsbc.utpl%2Fontology%23Estudiante%3E+.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fschema.org%2Fgender%3E+%3Fsexo.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FageRange%3E+++%3Fedad+.%0D%0A++++%0D%0A++%7D&format=text%2Fhtml&timeout=0&debug=on'
		},
		{
			nombre: 'Calificaciones',
			value: 'calificaciones',
			sql: 'http://206.189.215.246:8890/sparql?default-graph-uri=&query=select+distinct+*%0D%0A++where+%7B%0D%0A++++%3Fres+rdf%3Atype+%3Chttp%3A%2F%2Fsbc.utpl%2Fontology%23Estudiante%3E+.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fsbc.utpl%2Fdata%2Fevaluation%3E+%3Fevaliacion.%0D%0A++++%3Fevaliacion+%3Chttp%3A%2F%2Fvivoweb.org%2Fontology%2Fcore%23score%3E+%3Fcalifacion.%0D%0A++%7D+&format=text%2Fhtml&timeout=0&debug=on'
		},
		{
			nombre: 'Rango Edad',
			value: 'rangoedad',
			sql: 'http://206.189.215.246:8890/sparql?default-graph-uri=&query=select+distinct+*%0D%0A++where+%7B%0D%0A++++%3Fres+rdf%3Atype+%3Chttp%3A%2F%2Fsbc.utpl%2Fontology%23Estudiante%3E+.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fschema.org%2Fgender%3E+%3Fsexo.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FageRange%3E+++%3Fedad+.%0D%0A++++FILTER+%28%3Fedad+%3D+%270-35%27%29++++%0D%0A++%7D+&format=text%2Fhtml&timeout=0&debug=on'
		},
	];

	constructor(
		private http: Http,
	) { }

	ngOnInit() {
	}

	sparkql(item) {
		var sql = "";

		if (item.value === 'rangoedad') {
			sql = `http://206.189.215.246:8890/sparql?default-graph-uri=&query=select+distinct+*%0D%0A++where+%7B%0D%0A++++%3Fres+rdf%3Atype+%3Chttp%3A%2F%2Fsbc.utpl%2Fontology%23Estudiante%3E+.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fschema.org%2Fgender%3E+%3Fsexo.%0D%0A++++%3Fres+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FageRange%3E+++%3Fedad+.%0D%0A++++FILTER+%28%3Fedad+%3D+%27${this.selected2}%27%29++++%0D%0A++%7D+&format=text%2Fhtml&timeout=0&debug=on`;
		}else{
			sql = item.sql;
		}
		
		let headers: Headers = new Headers({
		//   'Content-type': 'application/x-www-form-urlencoded',
		//   'Accept': 'application/json'
		});
	
		let params = new URLSearchParams();
		params.append('query', sql);
		params.append('format', 'json');
	
		let options: RequestOptionsArgs = {
		  headers: headers,
		  params: URLSearchParams
		};
	
		this.http.get(`${sql}`, options) // 1
		  .subscribe((data:any) => {
			  console.log(data);
			  this.sparkqlData = data; // 3
		   });
		 console.log(this.sparkqlData);  // 2
	  }

}
