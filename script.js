var ideaQuality = 0;
var qualityDisplay = ['quality: swill', 'quality: plausible', 'quality: genius'];

$('.save').on('click', saveInput);
$('.container-bottom').on('click', '.delete-button-header', deleteCard);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.container-bottom').on('click', '.downvote', downVoteChange);
$(window).on('load', restoreCard);
$('form').on('keyup', verifyInput);
$('.container-bottom').on('blur', '.user-content', saveEditedCard);
$('.search').on('keyup', filterCards);

function verifyInput() {
  var title = document.querySelector('.title');
  var body = document.querySelector('.body');
  if (title.value !== '' && body.value !== '') {
    document.querySelector('.save').removeAttribute('disabled');
  } else {
    document.querySelector('.save').setAttribute('disabled', '');
  }
};

function saveInput(e) {
  e.preventDefault();
  var title = document.querySelector('.input').value;
  var body = document.querySelector('.body').value;
  var newCard = new MakeCard(title, body);
  prependCard(newCard);
  clearInput();
  storeCard(newCard, newCard.id);
  verifyInput();
};

function prependCard(object) {
  var ideaCard = document.createElement('article');
  ideaCard.innerHTML = `
  <article class="cards" id=${object.id}>
      <img class="delete-button-header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
      <h2 class="header user-content" id="titleText" contenteditable="true">${object.title}</h2></span>
     <p class="description user-content" id="bodyText" contenteditable="true">${object.body}</p>
     <section class='quality-section'>
     <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="" role="upvote button">
     <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="" role="downvote button">
     <p class="quality">${object.ideaQuality}</p>
   </article>`;
  $('.container-bottom').prepend(ideaCard);
};

function filterCards() {
  var input = document.querySelector('.search').value;
  var uppercaseInput = input.toUpperCase();
  var card = document.querySelectorAll('article');
  var userContent;  
  debugger
  for (var i = 0; i < card.length; i++) {
    userContent = card[i].getElementByTagName("h2")[0];
    if (userContent.innerHTML.toUpperCase().indexOf(uppercaseInput) > -1) {
      card[i].style.display = '';
    } else {
      card[i].style.display = none;
    }
  }
}

function MakeCard(title, body, id, ideaQuality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.ideaQuality = ideaQuality || 'quality: swill';
};

function storeCard(card, id) {
  var stringifyCard = JSON.stringify(card);
  localStorage.setItem(id, stringifyCard);
};

function restoreCard() {
  for (var i = 0; i < localStorage.length; i++) {
    var object = localStorage.getItem(localStorage.key(i))
    var parsedCard = JSON.parse(object);
    prependCard(parsedCard);
  }
};

function getCard(id) {
  var stringifyCard = localStorage.getItem(id);
  return JSON.parse(stringifyCard);
};

function clearInput() {
  var inputs = document.querySelector('.form');
      inputs.reset();
};

function deleteCard(id) {
  (this).closest('article').remove();
  localStorage.removeItem(localStorage.key(this.id))
};

function saveEditedCard(e) {
  e.preventDefault();
  var id = $(this).parent('article').attr('id');
  var parseCard = getCard(id);
  parseCard.title = $(this).parent('article').children('#titleText').text();
  parseCard.body = $(this).parent('article').children('#bodyText').text();
  storeCard(parseCard, id);
}

function upvoteChange() {
  debugger
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  if (ideaQuality <= 1) {
    ideaQuality++;
    $(this).closest('.quality-section').find('p')[0].innerText = qualityDisplay[ideaQuality];
    parseCard.ideaQuality = qualityDisplay[ideaQuality]
  }
  console.log(parseCard);
  storeCard(parseCard, id);
};

function downVoteChange() {
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  if (ideaQuality >= 1) {
    console.log(ideaQuality);
    ideaQuality--;
    $(this).closest('.quality-section').find('p')[0].innerText = qualityDisplay[ideaQuality];
    parseCard.ideaQuality = qualityDisplay[ideaQuality]
  }
 storeCard(parseCard, id);
};

