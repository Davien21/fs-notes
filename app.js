const node_static = require('node-static');
const app = require('./NoteClass');
const file_server = new node_static.Server('./public');

const http = require('http');
const url = require('url');
 
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000
const server = http.createServer((req,res) => {
	let q = url.parse(req.url, true);
	console.log(q.pathname);
	if (req.method === 'GET') {
		file_server.serve(req,res);
	}

	
	if (q.pathname !== '/' && req.method === 'POST') {

		let res_data;
	    req.on("data", (data) => {
	    	res_data = JSON.parse(data.toString());
	    });
	    if (q.pathname === '/list') {
			// req.on("end", () => {
				app.getAllNotes(res);
		    // })
		}else if (q.pathname === '/create') {
		    req.on("end", () => {
				app.createNote(res,res_data['name'],res_data['content']);
		    })
		}else if (q.pathname === '/delete') {
		    req.on("end", () => {
				app.deleteNote(res,res_data['name']);
		    });
		}else if (q.pathname === '/rename') {
		    req.on("end", () => {
				app.renameNote(res,res_data['name'],res_data['new_name']);
		    });
		}else if (q.pathname === '/update') {
		    req.on("end", () => {
				app.updateNote(res,res_data['name'],res_data['content']);
		    });
		}else if (q.pathname === '/view') {
			req.on("end", () => {
				app.getNoteContent(res,res_data['name']);
		    });
		}
	}
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
