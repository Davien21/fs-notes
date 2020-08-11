const fs = require('fs');

class NoteClass {
	constructor () {
		this.headers = {
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": "*",
	        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
	        "Access-Control-Max-Age": 2592000 // 30 days
	      /** add other headers as per requirement */
		}
	}
	getAllNotes (res) {
		fs.readdir(`./notes`, (err, files) => { 
			res.writeHead(200, this.headers);
			if (err) {
				let json = {status:false,message:err};
				res.end(JSON.stringify(json));
			}else {
				let json = {status:true,message:`retrieved file list`,data:files};
				res.end(JSON.stringify(json));
			}
		}) 
	}
	getNoteContent (res,name) {
		fs.readFile(`./notes/${name}.txt`, (err, data) => {
			res.writeHead(200, this.headers);
		 	if (err) {
				let json = {status:false,message:err};
				res.end(JSON.stringify(json));
			}else {
				let json = {status:true,message:`${name} file was read`,data:data.toString()};
				res.end(JSON.stringify(json));
			}
		});
	}

	createNote (res,name,content) {
		try {
			fs.writeFileSync(`./notes/${name}.txt`,content)
			res.writeHead(200, this.headers);
			let json = {status:true,message:`${name} file was created`,data:{name,content}};
			res.end(JSON.stringify(json));
		} catch(err) {
			let json = {status:false,message:err};
			res.end(JSON.stringify(json));
		}
	}

	deleteNote (res,name) {
		fs.unlink(`./notes/${name}.txt`, (err) => {
			res.writeHead(200, this.headers);
			if (err) {
				let json = {status:false,message:err};
				res.end(JSON.stringify(json));
			}else {
				let json = {status:true,message:`${name} file was deleted`};
				res.end(JSON.stringify(json));
			}
		})
	}
	updateNote (res,name,content) {
		fs.writeFile(`./notes/${name}.txt`,content, (err) => {
			res.writeHead(200, this.headers);
			if (err) {
				let json = {status:false,message:err};
				res.end(JSON.stringify(json));
			}else {
				let json = {status:true,message:`${name} file was updated`};
				res.end(JSON.stringify(json));
			}
		});
		
	}
	renameNote (res,name,new_name) {
		fs.rename(`./notes/${name}.txt`,`./notes/${new_name}.txt` , (err) => {
			res.writeHead(200, this.headers);
			if (err) {
				let json = {status:false,message:err};
				res.end(JSON.stringify(json));
			}else {
				let json = {status:true,message:`${name} file was renamed to ${new_name}`};
				res.end(JSON.stringify(json));
			}
		})
	}
}
let note_stack = new NoteClass;
module.exports = note_stack;