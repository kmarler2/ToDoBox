$('.container-bottom').on('blur', '.user-content', saveEditedCard);
$('.container-bottom').on('change', '.checkbox', markCardCompleted);
$('.container-bottom').on('click', '.delete-button-header', deleteCard);
$('.container-bottom').on('click', '.downvote', downvoteChange);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.sort-by-importance').on('click', sortByImportance);
$('.save').on('click', saveInput);
$('.search').on('keyup', filterCards);
$('.show-completed').on('click', showCompletedCards);
$('form').on('keyup', verifyInput);
$(window).on('load', restoreCard);
$(window).on('load', showMore);

function verifyInput() {
  var title = $('.title');
  var body = $('.body');
  if (title.value !== '' && body.value !== '') {
    $('.save').removeAttr('disabled');
  } else {
    $('.save').setAttr('disabled');
  }
};

function saveInput(e) {
  e.preventDefault();
  var title = $('.input').val();
  var body = $('.body').val();
  var newCard = new MakeCard(title, body);
  verifyInput();
  clearInput();
  prependCard(newCard);
  storeCard(newCard, newCard.id);
  displayButton();
};

function prependCard(object) {
  $('.container-bottom').prepend(
  `<article class="cards" id=${object.id}>
    <img class="delete-button-header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
    <h2 class="header user-content" id="titleText" contenteditable="true">${object.title}</h2></span>
    <p class="description user-content" id="bodyText" contenteditable="true">${object.body}</p>
    <section class='importance-section'>
    <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="" role="upvote button">
    <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="" role="downvote button">
    <p class="importance">importance: ${object.importance}</p>
    <p class="completed-checkbox">| completed</p>
    <input type="checkbox" class="checkbox">
   </article>`)
};

function filterCards() {
  var input = $('.search').val();
  var cards = $('.cards');
  cards.each(function() {
    $(this).text().indexOf(input)
    console.log($(this).text().indexOf(input))
    if ($(this).text().indexOf(input) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    };
  });
};

function MakeCard(title, body, id, completed) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.importance = 'normal';
  this.completed = false;
};

function storeCard(card, id) {
  var stringifyCard = JSON.stringify(card);
  localStorage.setItem(id, stringifyCard);
};

function restoreCard() {
  for (var i = 0; i < localStorage.length; i++) {
    var object = localStorage.getItem(localStorage.key(i))
    var parsedCard = JSON.parse(object);
    if (parsedCard.completed === false) {
      prependCard(parsedCard);
    }
  }  displayButton();
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
  $(this).closest('article').remove();
  localStorage.removeItem(localStorage.key(this.id));
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
  var qualityDisplay = ['importance: none','importance: low','importance: normal', 'importance: high', 'importance: critcal'];
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  var importance = qualityDisplay.indexOf(parseCard.importance);
  if (importance < 4) {
    importance++;
    $(this).closest('.importance-section').find('.importance').text(qualityDisplay[importance]);
    parseCard.importance = qualityDisplay[importance];
  } storeCard(parseCard, id);
};

function downvoteChange() {
  var qualityDisplay = ['importance: none','importance: low','importance: normal', 'importance: high', 'importance: critcal'];
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  var importance = qualityDisplay.indexOf(parseCard.importance);
  if (importance > 0) {
    importance--;
    $(this).closest('.importance-section').find('.importance').text(qualityDisplay[importance]);
    parseCard.importance = qualityDisplay[importance];
  } storeCard(parseCard, id);
};

function markCardCompleted() {
  var id = $(this).closest('article').attr('id');
  var parseCard = getCard(id);
  var card = $(this).closest('article');
  card.toggleClass('completed');
  parseCard.completed = !parseCard.completed;
  storeCard(parseCard, id);
}

function displayButton() {
  var button = $('.show-more');
  if (localStorage.length >= 10) {
    button.removeAttr('hidden');
  }
}

function showMore() {
  $('.container-bottom article').slice(0, 3).show;
};

function showCompletedCards() {
  var button = $('.show-completed');
  var card = $(this).parent('article');
  for (var i = 0; i < localStorage.length; i++) {
    var object = localStorage.getItem(localStorage.key(i))
    var parsedCard = JSON.parse(object);
    if (parsedCard.completed === true) {
      prependCard(parsedCard);
      card.toggleClass('completed');
      button.prop('disabled', true);
    } 
  }
};  

function sortByImportance() {
  var cards = $('.cards')
  var buttonText = $(this).text()
    cards.each(function() {
    if (cards.text().includes(buttonText)) {
      cards.show();
    } else {
      cards.hide();
    }
  });
}
