
var titleInput = document.querySelector('.input');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save');
// var thingsToShow = document.querySelector('.container-bottom');
var deleteButton = document.querySelector('.delete-button');
var quality = document.querySelector('.quality');
var ideaQuality = 0;
var qualityDisplay = ['quality: swill', 'quality: plausible', 'quality: genius'];

saveButton.addEventListener('click', saveInput);


$('.container-bottom').on('click', '.delete-button', deleteCard);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.container-bottom').on('click', '.downvote', downVoteChange);

function saveInput(e) {
 e.preventDefault();
 var title = titleInput.value;
 var body = bodyInput.value;
 var newCard = new MakeCard(title, body);
 prependCard(newCard);
}


function prependCard(newCard) {
  var ideaCard = document.createElement('article');
  ideaCard.innerHTML = `
  <article class="cards">
     <h4 class="header">${newCard.title}
      <img class="delete-button header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
     </h4>

     <p class="description">${newCard.body}</p>
     <div class="quality-line">
     <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="">
     <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="">
     <p class="quality">quality:swill</p>
     </div>
   </article>
  `;
  $('.container-bottom').prepend(ideaCard);
  clearInput();
}

function MakeCard(title, body, id, ideaQuality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.ideaQuality = ideaQuality || 0;
  // this.qualityDisplay = ['quality: swill', 'quality: plausible', 'quality: genius'];
}

function storeCard(newCard) {
  var stringifyCard = JSON.stringify(newCard);
  localStorage.setItem(newCard.id, stringifyCard);
}

function clearInput() {
  titleInput.value = '';
  bodyInput.value = '';
}

function deleteCard() {
  // e.preventDefault();
  (this).closest('article').remove();
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



// event listeners