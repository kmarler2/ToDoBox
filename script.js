/ Adding a new idea
// On the application’s main page, a user should:

// See two text boxes for entering the “Title” and “Body” for a new idea, and a “Save” button for committing that idea.
// When a user clicks “Save”:

// A new idea with the provided title and body should appear in the idea list.
// The text fields should be cleared and ready to accept a new idea.
// The page should not reload.
// The idea should be persisted. It should still be present upon reloading the page.


var titleInput = document.querySelector('.input');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('.save');

saveButton.addEventListener('click', addCard);

function addCard() {
 e.preventDefault();
 var title = titleInput.value;
 var body = bodyInput.value;
 var ideaCard = document.createElement('article');
  bookmark.innerHTML = `
  <article class="cards">
     <h4 class="header">${title}
       <img class="delete-button header" src="FEE-ideabox-icon-assets/delete.svg" alt="">
     }
     </h4>
     <p class="description">Tiramisu carrot cake fruitcake gingerbread bear claw powder icing tootsie roll ice cream.</p>
     <div class="quality-line">
     <img class="upvote" src="FEE-ideabox-icon-assets/upvote.svg" alt="">
     <img class="downvote" src="FEE-ideabox-icon-assets/downvote.svg" alt="">
     <p class="quality">quality:swill</p>
     </div>
   </article>
  `;
}


// event listeners