var titleInput = document.querySelector('.input');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save');
var deleteButton = document.querySelector('.delete-button-header');
var quality = document.querySelector('.quality');
var ideaQuality = 0;
var qualityDisplay = ['quality: swill', 'quality: plausible', 'quality: genius'];
var key;

saveButton.addEventListener('click', saveInput);
$('.container-bottom').on('click', '.delete-button-header', deleteCard);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.container-bottom').on('click', '.downvote', downVoteChange);
$(window).on('load', restoreCard);

function saveInput(e) {
  e.preventDefault();
  var title = titleInput.value;
  var body = bodyInput.value;
  var newCard = new MakeCard(title, body);
  prependCard(newCard);
  clearInput();
  storeCard(newCard);
}

function prependCard(object) {
  var ideaCard = document.createElement('article');
  ideaCard.innerHTML = `
  <article class="cards" id=${object.id}>
     <span class="idea-head">
      <img class="delete-button-header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
      <h4 class="header" contenteditable="true">${object.title}</h4></span>
     <p class="description" contenteditable="true">${object.body}</p>
     <div class="quality-line">
     <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="" role="upvote button">
     <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="" role="downvote button">
     <p class="quality">quality:swill</p>
     </div>
   </article>
  `;
  $('.container-bottom').prepend(ideaCard);
}

function MakeCard(title, body, id, ideaQuality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.ideaQuality = ideaQuality || 0;
}

function storeCard(newCard) {
  key = newCard.id;
  var stringifyCard = JSON.stringify(newCard);
  localStorage.setItem(key, stringifyCard);
}

function restoreCard() {
  for (var i = 0; i < localStorage.length; i++) {
    var object = localStorage.getItem(localStorage.key(i))
    var parsedCard = JSON.parse(object);
    prependCard(parsedCard);
  }
}

function clearInput() {
  titleInput.value = '';
  bodyInput.value = '';
}

function deleteCard(id) {
  (this).closest('article').remove();
  localStorage.removeItem(localStorage.key(this.id))
}

function upvoteChange() {
  if (ideaQuality <= 1) {
    ideaQuality++;
    $(this).closest('.quality-line').find('p')[0].innerHTML = qualityDisplay[ideaQuality];
  }
};

function downVoteChange() {
  if (ideaQuality >= 1) {
    ideaQuality--;
    $(this).closest('.quality-line').find('p')[0].innerHTML = qualityDisplay[ideaQuality];
  }
};

