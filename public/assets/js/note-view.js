let note_form = document.querySelector('form.note-form');
let title_div = document.querySelector('.title-div');
let note_content = document.querySelector('textarea[name=content]');
let actions_div = document.querySelector('div#actions-div');
let err_span = document.querySelector('.err');

let url = 'http://127.0.0.1:5000/';
function isViewQuery (querystring) {
	let regex = /a=view&n=/;
	return regex.test(querystring) ? true : false;
}
function isCreateQuery (querystring) {
	let regex = /a=create/;
	return regex.test(querystring) ? true : false;
}

let query = window.location.search.slice(1);
if (isCreateQuery(query)) {
	handle_create_query();
}else if (isViewQuery(query)) {
	let note_name = query.slice(query.indexOf('&n=')+3);
	handle_view_query(note_name);
}

function handle_view_query (name) {
	show_topic(formatContent(name));
	get_note(formatContent(name))
	
}
function get_note (name) {
	let body = {name};
	fetch(`${url}view`, {
	    method: 'post',
	    headers: {
	        "Content-Type": "application/json",
	    },
	    body: JSON.stringify(body)
	})
	.then (res => (res.json()))
	.then (content => {
		show_note(content.data);
	})
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}
function show_topic (topic) {
	let title_content = 
	`
		<input name="name" class="form-control" value="${topic}">
		<div class="input-group-append">
			<button class="btn btn-primary" id="rename-title">Save</button>
		</div>
	`
	title_div.innerHTML += title_content;
	title_div.querySelector('button').onclick = () => renameTopic(topic)
}
function renameTopic (topic) {
	let new_name = title_div.querySelector('input').value;
	if (new_name === '') {
		return alert('Cannot give a blank name')
	}
	new_name !== topic ? renameTopicReq(topic,new_name) : alert('Change the topic first'); 
}
function renameTopicReq (name,new_name) {
	let body = {name,new_name};
	fetch(`${url}rename`, {
	    method: 'post',
	    headers: {
	        "Content-Type": "application/json",
	    },
	    body: JSON.stringify(body)
	})
	.then (res => (res.json()))
	.then (data => {
		alert('New name has been saved');
		window.location.href = `./note-view.html?a=view&n=${new_name}`;
	})
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}
function formatContent (content) {
	return content.replace(/%20/g,' ').trim()
}
function updateNote (content) {
	let new_content = note_content.value;
	let topic = document.querySelector('input').value.trim();
	content !== new_content ? updateNoteReq(topic,new_content) : alert('Change the content first'); 
}
function updateNoteReq (name,content) {
	let body = {name,content};
	fetch(`${url}update`, {
	    method: 'post',
	    headers: {
	        "Content-Type": "application/json",
	    },
	    body: JSON.stringify(body)
	})
	.then (res => (res.json()))
	.then (data => {
		alert('Successfully edited note');
		// window.location.href = `./note-view.html?a=view&n=${name}`;
	})
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}
function show_note (content) {
	note_content.innerText = content;
	let action_btn = 
	`
		<button id="edit-note" class="btn btn-primary">Save Note</button>
	`
	actions_div.innerHTML += action_btn;
	action_btn = actions_div.querySelector('button#edit-note');
	action_btn.onclick = () => updateNote(content);
}
function handle_create_query () {
	let title_btn = 
	`
		<input name="name" class="form-control" placeholder="Type a Topic or Title">
		<div class="input-group-append">
			<div class="btn btn-orange" id="title-action">Topic</div>
		</div>
	`
	note_content.placeholder = 'Write the Content of this note...';
	title_div.innerHTML += title_btn;
	let action_btn = 
	`
		<button id="create" class="btn btn-success">Create New Note</button>
	`
	actions_div.innerHTML += action_btn;
	action_btn = actions_div.querySelector('button#create');
	action_btn.onclick = () => {
		let title = title_div.querySelector('input').value;
		let content = note_content.value.trim();
		create_request(title,content);
	};
}

function create_request (name,content) {
	if (name === '' || content === '') {
		return err_span.innerText = 'Fill both Title and Note contents';
	} 	 
	let body = {name,content};
	fetch(`${url}create`, {
	    method: 'post',
	    headers: {
	        "Content-Type": "application/json",
	    },
	    body: JSON.stringify(body)
	})
	.then (res => (res.json()))
	.then (data => {
		alert(`${title}\nwas successfully created`);
		window.location.href = './'
	})
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}

/*=======Util functions=========*/