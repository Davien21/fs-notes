let note_form = document.querySelector('form.note-form');
let title_div = document.querySelector('.title-div');
let title_input = document.querySelector('input[name=name]');
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
	handle_view_query();
}

function handle_view_query () {
	display_note()
	
}
function display_note () {
	handle_topic ('r');
	handle_content('tr');
}
function handle_topic (topic) {
	note_content.disabled = true;
	let title_btn = 
	`
		<input name="name" disabled class="form-control" placeholder="Type a Topic or Title">
		<div class="input-group-append">
			<div class="btn btn-primary" id="rename-title">Change</div>
		</div>
	`
	title_div.innerHTML += title_btn;
}
function handle_content (content) {
	let action_btn = 
	`
		<button id="edit-note" class="btn btn-primary">Edit Note</button>
	`
	actions_div.innerHTML += action_btn;
	action_btn = actions_div.querySelector('button#edit-note');
	action_btn.onclick = () => {
		let title = title_input.value.trim();
		let content = note_content.value.trim();
		create_request(title,content);
	};
}
function handle_create_query () {
	let title_btn = 
	`
		<input name="name" class="form-control" placeholder="Type a Topic or Title">
		<div class="input-group-append">
			<div class="btn btn-orange" id="title-action">Topic</div>
		</div>
	`
	title_div.innerHTML += title_btn;
	let action_btn = 
	`
		<button id="create" class="btn btn-success">Create New Note</button>
	`
	actions_div.innerHTML += action_btn;
	action_btn = actions_div.querySelector('button#create');
	action_btn.onclick = () => {
		let title = title_input.value.trim();
		let content = note_content.value.trim();
		create_request(title,content);
	};
}
function handle_creation (title) {
	alert(`${title}\nwas successfully created`);
	window.location.href = './'

}
function create_request (title,content) {
	if (title === '' || content === '') {
		return err_span.innerText = 'Fill both Title and Note contents';
	} 	 
	let body = {
		name:title,
		content:content
	}
	fetch(`${url}create`, {
	    method: 'post', // *GET, POST, PUT, DELETE, etc.
	    headers: {
	        "Content-Type": "application/json",
	    },
	    body: JSON.stringify(body) // body data type must match "Content-Type" header
	})
	.then (res => (res.json()))
	.then (data => {handle_creation(title)})
	.catch(err => alert(`There seems to be an Error:\n${err}`));
}