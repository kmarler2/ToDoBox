// // / Adding a new idea
// // On the application’s main page, a user should:

// // See two text boxes for entering the “Title” and “Body” for a new idea, and a “Save” button for committing that idea.
// // When a user clicks “Save”:

// // A new idea with the provided title and body should appear in the idea list.
// // The text fields should be cleared and ready to accept a new idea.
// // The page should not reload.
// // The idea should be persisted. It should still be present upon reloading the page.


var titleInput = document.querySelector('.input');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save');
// var thingsToShow = document.querySelector('.container-bottom');
var deleteButton = document.querySelector('.delete-button');
var quality = document.querySelector('.quality');
var ideaQuality = 0;
var qualityDisplay = ['quality: swill', 'quality: plausible', 'quality: genius'];

delete
saveButton.addEventListener('click', addCard);


$('.container-bottom').on('click', '.delete-button', deleteCard);
$('.container-bottom').on('click', '.upvote', upvoteChange);
$('.container-bottom').on('click', '.downvote', downVoteChange);



function addCard(e) {
 e.preventDefault();
 var title = titleInput.value;
 var body = bodyInput.value;
 var ideaCard = document.createElement('article');
  ideaCard.innerHTML = `
  <article class="cards">
     <h4 class="header">${title}
      <img class="delete-button header" id="delete" src="FEE-ideabox-icon-assets/delete.svg" alt="">
     </h4>

     <p class="description">${body}</p>
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