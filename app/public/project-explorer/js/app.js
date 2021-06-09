let path = window.location.pathname;

function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  let expires = "expires="+ date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  let cookieDecoded = decodeURIComponent(document.cookie);
  let cookiesArr = cookieDecoded.split(';');
  for(let i = 0; i < cookiesArr.length; i++) {
    let cookie = cookiesArr[i].split('=');
    if (name == cookie[0].trim()) {
      return cookie[1];
    }
  }
  return '';
}

function delCookie(name) {
  setCookie(name, '', -1);
}

async function getPrograms() {
  const response = await fetch('/api/programs');
  const programs = await response.json();
  let selectProgram = document.getElementById('program');
  selectProgram.innerHTML = '<option selected>Choose...</option>';
  let optionValue = [];
  for (i = 0; i < programs.length; i++) {
    optionValue.push(programs[i].toLowerCase().replace(/[^a-z]/gi, '_'));
    for (j = 0; j < optionValue.length; j++) {
      if (i===j) {
        selectProgram.innerHTML = selectProgram.innerHTML + '<option value="' + optionValue[j] + '">' + programs[i] + '</option>'
      }
   }
  }
}

async function getGraduationYears () {
  const response = await fetch('/api/graduationYears');
  const graduationYears = await response.json();
  let selectGraduationYear = document.getElementById('graduationYear');
  selectGraduationYear.innerHTML = '<option selected>Choose...</option>';
  for (i = 0; i < graduationYears.length; i++) {
      selectGraduationYear.innerHTML = selectGraduationYear.innerHTML + '<option value="' + graduationYears[i] + '">' + graduationYears[i] + '</option>'
  }
}

async function updateNav () {
  let cookieVal = getCookie('uid');
  let beforeLogin = document.getElementById('info-bar');
  let afterLogin = document.getElementById('info-bar1');
  if (cookieVal !== '') {
    beforeLogin.style.display = 'none'
    const response = await fetch('/api/users/'+cookieVal+'');
    const userDb = await response.json();
    let userGreeting = document.getElementById('username');
    userGreeting.innerHTML = `Hi, ${userDb.firstname}`
    let logout = document.getElementById('logout');
    logout.onclick = function logOff() {
      delCookie('uid');
      window.location.href = 'index.html';
    }
  } else {
    afterLogin.style.display = 'none';
  }
}

async function registerUser (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formJSON = Object.fromEntries(formData.entries());
  formJSON.firstname = formJSON.firstName;
  formJSON.lastname = formJSON.lastName;
  delete formJSON.firstName;
  delete formJSON.lastName;
  console.log(formJSON)
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formJSON, null, 1)
});
const responseJSON = await response.json() 
if (responseJSON.status !== 'ok') {
  const errors = responseJSON.errors;
  let errorDiv = document.createElement('div');
  errorDiv.classList.add('alert');
  errorDiv.classList.add('alert-danger');
  for (let i = 0; i < errors.length; i++) {
    let errP = document.createElement('p');     
    errP.innerText = errors[i];          
    errorDiv.appendChild(errP); 
  }
  let referenceEl = document.getElementById("signupForm");
  let parent = referenceEl.parentNode;
  parent.insertBefore(errorDiv, referenceEl);
} else {
  const data = responseJSON.data;
  setCookie('uid', data.id, 7);
  window.location.href = 'index.html';
}
}

async function logUser (event) {
  event.preventDefault();
  const loginFormData = new FormData(event.target);
  const loginFormJSON = Object.fromEntries(loginFormData.entries());
  const loginResponse = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(loginFormJSON, null, 1)
});
  const loginResponseJSON = await loginResponse.json();
  if (loginResponseJSON.status !== 'ok') {
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('alert');
    errorDiv.classList.add('alert-danger');
    let errP = document.createElement('p');     
    errP.innerText = 'Invalid email/password';          
    errorDiv.appendChild(errP); 
    let referenceEl = document.getElementById("loginForm");
    let parent = referenceEl.parentNode;
    parent.insertBefore(errorDiv, referenceEl);
  } else {
    const data = loginResponseJSON.data;
    setCookie('uid', data.id, 7)
    window.location.href = 'index.html';
  }
}

async function submitProject (event) {
  event.preventDefault();
  const createProjectData = new FormData(event.target);
  const createProjectDataJSON = Object.fromEntries(createProjectData.entries());
  createProjectDataJSON.authors = createProjectDataJSON.authors.split(',');
  createProjectDataJSON.tags =createProjectDataJSON.tags.split(',');
  const submitResponse = await fetch('/api/projects', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(createProjectDataJSON, null, 1)
  });
  const submitResponseJSON = await submitResponse.json();
  if (submitResponseJSON.status !== 'ok') {
    const error = submitResponseJSON.errors;
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('alert');
    errorDiv.classList.add('alert-danger');
      let errP = document.createElement('p');     
      errP.innerText = error;          
      errorDiv.appendChild(errP); 
    let referenceEl = document.getElementById("createProjectForm");
    let parent = referenceEl.parentNode;
    parent.insertBefore(errorDiv, referenceEl);
  } else {
    window.location.href = 'index.html';
  }
}

async function getProjects () {
  const response = await  fetch('/api/projects');
  const resData = await response.json();
  let main = document.getElementById('main');
  let containerDiv = document.createElement('div');
  main.appendChild(containerDiv);
  containerDiv.className = 'd-flex justify-content-around showcase';
  let projectDiv;
  let projectBody;
  let projectTitle;
  let projectAuthor;
  let projectAbstract;
  let projectTags;
  
  for (let i = 0; i < 4; i++) {
    projectDiv = document.createElement('div');
    projectDiv.className = 'card';
    projectDiv.style.width = '20%';
    projectBody = document.createElement('div');
    projectBody.className = 'card-body';
    projectTitle = document.createElement('h5');
    projectTitle.className = 'card-title text-primary';
    projectTitle.innerHTML = '<a href="viewproject.html?id='+resData[i].id+'" class="card-link">'+resData[i].name+'</a>';
    projectAuthor = document.createElement('h6');
    projectAuthor.className = 'card-subtitle text-muted my-2';
    projectAuthor.textContent = resData[i].authors;
    projectAbstract = document.createElement('p');
    projectAbstract.className = 'card-text';
    projectAbstract.textContent = resData[i].abstract;
    projectBody.appendChild(projectTitle);
    projectBody.appendChild(projectAuthor);
    projectBody.appendChild(projectAbstract);
    

    for (let j = 0; j < resData[i].tags.length; j++) {
    projectTags = document.createElement('a');
    projectTags.className = 'card-link';
    projectTags.textContent = resData[i].tags[j];
    projectBody.appendChild(projectTags);
    }
    projectDiv.appendChild(projectBody);
    containerDiv.appendChild(projectDiv);  
  }
  
}

async function updateViewProject () {
  const pageUrl = window.location.search;
  const urlParams = new URLSearchParams(pageUrl);
  const id = urlParams.get('id');
  const projectInfoResponse = await fetch('/api/projects/'+id+'');
  const projectInfo = await projectInfoResponse.json();
  const userInfoResponse = await fetch('/api/users/'+projectInfo.createdBy+'');
  const userData = await userInfoResponse.json();
  let main = document.getElementById('main01')
  let projectName = document.createElement('h4');
  projectName.id = 'project_name';
  projectName.className = 'font-weight-bold mt-5 mb-3 ml-3'
  projectName.textContent = projectInfo.name;
  let container1 = document.createElement('div');
  container1.className = 'container';
  let row1 = document.createElement('div');
  row1.className = 'row bg-light d-flex align-items-center';
  container1.appendChild(row1);
  let createdByDiv = document.createElement('div');
  createdByDiv.className = 'col text-center';
  createdByDiv.innerHTML = '<h6>Created By</h6>' + '<p>'+userData.firstname+' '+userData.lastname+'</p>';
  let dateCreatedDiv = document.createElement('div');
  dateCreatedDiv.className = 'col text-center';
  dateCreatedDiv.innerHTML = '<h6>Date Created</h6>' + '<p>2020-08-30</p>';
  let lastUpdatedDiv = document.createElement('div');
  lastUpdatedDiv.className = 'col text-center';
  lastUpdatedDiv.innerHTML = '<h6>Last Updated</h6>' + '<p>2020-08-30</p>';
  let editButton = document.createElement('div');
  editButton.className = 'col text-center';
  editButton.innerHTML = '<a class="btn btn-primary" href="editproject.html" role="button">Edit Project</a>';
  row1.appendChild(createdByDiv);
  row1.appendChild(dateCreatedDiv);
  row1.appendChild(lastUpdatedDiv);
  row1.appendChild(editButton);
  let row2 = document.createElement('div');
  row2.className = 'row mx-auto w-100';
  container1.appendChild(row2);
  let projectAbstractDiv = document.createElement('div');
  projectAbstractDiv.className = 'col';
  let projectDetailsDiv = document.createElement('div');
  projectDetailsDiv.className = 'col';
  row2.appendChild(projectAbstractDiv);
  row2.appendChild(projectDetailsDiv);
  let heading1 = document.createElement('h5');
  heading1.className = 'font-weight-bold py-3 border-bottom';
  heading1.textContent = 'Project Abstract';
  let abstract = document.createElement('p');
  abstract.className = 'mt-3';
  abstract.id = 'project_abstract';
  abstract.textContent = projectInfo.abstract;
  let commentDiv = document.createElement('div');
  commentDiv.className = 'form-group pt-4';
  let formLabel = document.createElement('label');
  formLabel.for = 'abstract';
  formLabel.className = 'form-label font-weight-bold';
  formLabel.textContent = 'Comments';
  let commentInput = document.createElement('textarea');
  commentInput.type = 'text';
  commentInput.name = 'abstract';
  commentInput.className = 'form-control';
  commentInput.placeholder = 'Leave a comment';
  let commentSubmit = document.createElement('button');
  commentSubmit.className = 'btn btn-primary mt-3';
  commentSubmit.type ='submit';
  commentSubmit.innerText = 'Submit';
  let showCommentDiv = document.createElement('div');
  showCommentDiv.className = 'border-top';
  showCommentDiv.innerHTML = '<p class="text-center mt-3">No comments added yet</p>';
  commentDiv.appendChild(formLabel);
  commentDiv.appendChild(commentInput);
  commentDiv.appendChild(commentSubmit);
  projectAbstractDiv.appendChild(heading1);
  projectAbstractDiv.appendChild(abstract);
  projectAbstractDiv.appendChild(commentDiv);
  projectAbstractDiv.appendChild(showCommentDiv);
  let heading2 = document.createElement('h5');
  heading2.className = 'font-weight-bold py-3 border-bottom';
  heading2.textContent = 'Project Details';
  let authorsCard = document.createElement('div');
  authorsCard.className = 'card';
  let authorsCardHeading = document.createElement('h5');
  authorsCardHeading.className = 'card-header';
  authorsCardHeading.textContent = 'Author(s)';
  authorsCard.appendChild(authorsCardHeading);
  let authorsCardBody = document.createElement('div');
  authorsCardBody.className = 'card-body';
  authorsCardBody.innerHTML = '<p id="project_authors" class="card-text">'+projectInfo.authors+'</p>';
  authorsCard.appendChild(authorsCardBody);
  let authorsCardFooter = document.createElement('div');
  authorsCardFooter.id = 'project_tags';
  authorsCardFooter.className = 'card-footer';
  for (let k = 0; k < projectInfo.tags.length; k++) {
    projectTags = document.createElement('a');
    projectTags.className = 'card-link';
    projectTags.href = '#';
    projectTags.textContent = projectInfo.tags[k];
    authorsCardFooter.appendChild(projectTags);
  }
  authorsCard.appendChild(authorsCardFooter);
  let projectFilesCard = document.createElement('div');
  projectFilesCard.className = 'card mt-3';
  let projectFilesCardHeading = document.createElement('h5');
  projectFilesCardHeading.className = 'card-header';
  projectFilesCardHeading.textContent = 'Project Files';
  projectFilesCard.appendChild(projectFilesCardHeading);
  let projectFilesCardBody = document.createElement('div');
  projectFilesCardBody.className = 'card-body';
  projectFilesCardBody.innerHTML = '<p class="card-text text-center">No file uploaded yet</p>';
  projectFilesCard.appendChild(projectFilesCardBody);
  projectDetailsDiv.appendChild(heading2);
  projectDetailsDiv.appendChild(authorsCard);
  projectDetailsDiv.appendChild(projectFilesCard);
  console.log(JSON.stringify(projectInfo))
  main.appendChild(projectName);
  main.appendChild(container1)
}

if (path.includes('index.html')) {
  window.onload = getProjects();
  window.onload = updateNav();
}

if (path.includes('login.html')) {
  window.onload = updateNav();
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', logUser);  
}

if (path.includes('profile.html')) {
  window.onload = updateNav();
}

if (path.includes('register.html')) {
  getPrograms();
  getGraduationYears();
  window.onload = updateNav();
  const form = document.querySelector('.needs-validation');
  form.addEventListener('submit', registerUser);  
}

if (path.includes('search.html')) {
  window.onload = updateNav();
}

if (path.includes('viewproject.html')) {
  window.onload = updateNav();
  updateViewProject()
}

if (path.includes('createproject.html')) {
  window.onload = updateNav();
 let cookie = getCookie('uid');
 if (cookie === '') {
   window.location.replace('login.html');
 } 
  const createProjectForm = document.getElementById('createProjectForm');
  createProjectForm.addEventListener('submit', submitProject);
}

if (path.includes('editproject.html')) {
  window.onload = updateNav();
}