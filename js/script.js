/*
Mitchell Nichols's Project - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
   function showPage(list, page){

      //limit 9 student's info per page
      const itemsPerPage = 9;

      //limit at least 9 per page from beginning to end
      const startIndex = (page * itemsPerPage) - itemsPerPage;
      const endIndex = page * itemsPerPage;

      //pull and set the ul and li elements
      const ul = document.querySelector(`.student-list`);
      const li = document.createElement('li'); 
      ul.innerHTML = '';

      //Check to see if there is any value in search result
      if(list.length === 0){
         let html = `
         No Results found!`; 
         ul.insertAdjacentHTML('beforeend', html);

      }else{
         //create li per student from data.js and return html
         function createLi(person){      
            let html = `
               <li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${person.picture.large}" alt="Profile Picture">
               <h3>${person.name.first} ${person.name.last}</h3>
               <span class="email">${person.email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${person.registered.date}</span>
               </div>
               </li>`; 
            return html;
            }
         }

      //create li html under ul section on each page
      for(let i = 0; i < list.length; i++){
         if(i >= startIndex && i < endIndex){
            ul.insertAdjacentHTML('beforeend', createLi(list[i]));
         }
      }
   }


   /*
   Create the `addPagination` function
   This function will create and insert/append the elements needed for the pagination buttons
   */
   function addPagination(list){
      const itemsPerPage = 9;

      // create a variable to calculate the number of pages needed
      numOfPages = Math.ceil(list.length / itemsPerPage);

      // select the element with a class of `link-list` and assign it to a variable
      const linkList = document.querySelector(`.link-list`);

      // to empty the button text content and reload everytime a button is clicked
      linkList.innerHTML = ``;

      // loop over the number of pages needed
      for(let i = 1; i <= numOfPages; i++){

         // create pagination button elements (1, 2, 3...)
         let html = `
            <li>
            <button type="button">${i}</button>
            </li>
            `;

         //add the button elements to html
         linkList.insertAdjacentHTML('beforeend', html);
      }    

   // set active class to first button as default if the button exists
   let buttonClassName = document.querySelector(".link-list button");
   if(buttonClassName){
      buttonClassName.className = "active";
   }

   // create an event listener on the `link-list` (button) element
   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON'){

         //select button with active class that was previous clicked
         button = document.querySelector("button.active");
         //remove the active class from previous licked button
         button.classList.remove("active"); //= "";
         //set active class to the latest clicked button
         e.target.className = 'active';
         //Call to add the buttons to the display part along with the data
         showPage(list, e.target.textContent);
      }

   });
   };

   const h = document.querySelector(`.header`);

   //create the search feature
   let html = `
   <label for="search" class="student-search">
      <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;

   //add the search feature elements to html
   h.insertAdjacentHTML('beforeend', html);

   const searchInput = document.querySelector('#search');
   const searchButton = document.querySelector('button');

   //call the search function when using the search feature. Pass in the filtered students data
   function searchBox(list){

   //declare and set the search input to all lower case - making it insensitive case
   const filterTerm = searchInput.value.toLowerCase();
   //use it to add all characters from seach input
   const searchTerm = [];
   
   //If the search input is not empty, check and collect characters into array
   if(filterTerm.length !== 0){
      for(let i=0; i< list.length; i++){
         const fullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
         if(fullName.includes(filterTerm)){
            searchTerm.push(list[i]);
         }
      }
      showPage(searchTerm,1);
      addPagination(searchTerm);
   //run this if there is nothing in search input
   } else {
      showPage(list, 1);
      addPagination(list);
      
   }
}

   //if the search button is clicked, call the searchBox function
   searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      searchBox(data)
   });

   //if the search field box is being typed in, it will search automatically without button
   searchInput.addEventListener('keyup', () => {
      searchBox(data);   
   });


   // Call functions
   showPage(data,1);
   addPagination(data);