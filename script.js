
$(window).on('load', restoreCard);
$('form').on('keyup', verifyInput);
$('.save').on('click', saveInput);
$('.container-bottom').on('blur', '.user-content', saveEditedCard);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.container-bottom').on('click', '.downvote', downvoteChange);
$('.container-bottom').on('click', '.delete-button-header', deleteCard);
$('.container-bottom').on( "click", '.checkbox' , markCardCompleted);
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
  verifyInput();
  clearInput();
  prependCard(newCard);
  storeCard(newCard, newCard.id);
};

function prependCard(object) {
  var ideaCard = document.createElement('article');
  ideaCard.innerHTML = 
  `<article class="cards" id=${object.id}>
    <img class="delete-button-header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
    <h2 class="header user-content" id="titleText" contenteditable="true">${object.title}</h2></span>
    <p class="description user-content" id="bodyText" contenteditable="true">${object.body}</p>
    <section class='importance-section'>
    <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="" role="upvote button">
    <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="" role="downvote button">
    <p class="importance">${object.importance}</p>
    <p>completed</p>
    <input type="checkbox" class="checkbox">
   </article>`;
  $('.container-bottom').prepend(ideaCard);
};

function filterCards() {
  var input = document.querySelector('.search').value;
  var card = document.querySelectorAll('.cards');
  for (i = 0; i < card.length; i++) {
    card[i].innerText.indexOf(input)
    console.log(card[i].innerText.indexOf(input))
    if (card[i].innerText.indexOf(input) > -1) {
      card[i].removeAttribute("hidden")
      console.log('bang')
    } else {
      card[i].setAttribute("hidden", true)
    }
  }
}

function MakeCard(title, body, id, importance) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 'importance: normal';
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
  var importance = 0;
  var qualityDisplay = ['importance: none','importance: low','importance: normal', 'importance: high', 'importance: critcal'];
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  if (importance <= 4) {
    importance++;
    $(this).closest('.importance-section').find('p')[0].innerText = qualityDisplay[importance];
    parseCard.importance = qualityDisplay[importance]
  }
  console.log(parseCard);
  storeCard(parseCard, id);
};

function downvoteChange() {
  var importance = 0;
  var qualityDisplay = ['importance: none','importance: low','importance: normal', 'importance: high', 'importance: critcal'];
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  if (importance >= 4) {
    console.log(importance);
    importance--;
    $(this).closest('.importance-section').find('p')[0].innerText = qualityDisplay[importance];
    parseCard.importance = qualityDisplay[importance]
  }
 storeCard(parseCard, id);
};

function markCardCompleted() {
  var card = $(this).closest('article')
  console.log(card)
  card.addClass('completed');
}

