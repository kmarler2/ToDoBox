var ideaQuality = 0;
var qualityDisplay = ['quality: swill', 'quality: plausible', 'quality: genius'];

$('.save').on('click', saveInput);
$('.container-bottom').on('click', '.delete-button-header', deleteCard);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.container-bottom').on('click', '.downvote', downVoteChange);
$(window).on('load', restoreCard);
$('form').on('keyup', verifyInput);

function verifyInput() {
  var title = document.querySelector('.title');
  var body = document.querySelector('.body');
  if (title.value !== '' && body.value !== '') {
    document.querySelector('.save').removeAttribute('disabled');
  } else {
    document.querySelector('.save').setAttribute('disabled', '');
  }
}

function saveInput(e) {
  e.preventDefault();
  var title = document.querySelector('.input').value;
  var body = document.querySelector('.body').value;
  var newCard = new MakeCard(title, body);
  prependCard(newCard);
  clearInput();
  storeCard(newCard);
  verifyInput();
}

function prependCard(object) {
  var ideaCard = document.createElement('article');
  ideaCard.innerHTML = `
  <article class="cards" id=${object.id}>
      <img class="delete-button-header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
      <h2 class="header" contenteditable="true">${object.title}</h2></span>
     <p class="description" contenteditable="true">${object.body}</p>
     <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="" role="upvote button">
     <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="" role="downvote button">
     <p class="quality">quality:swill</p>
   </article>`;
  $('.container-bottom').prepend(ideaCard);
}

function MakeCard(title, body, id, ideaQuality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.ideaQuality = ideaQuality;
}

function storeCard(newCard) {
  var key = newCard.id;
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
  var inputs = document.querySelector('.form');
      inputs.reset();
  console.log(inputs);
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
    console.log(ideaQuality);
    ideaQuality--;
    $(this).closest('.quality-line').find('p')[0].innerHTML = qualityDisplay[ideaQuality];
  }
};

