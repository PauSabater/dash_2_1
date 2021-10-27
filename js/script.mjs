window.addEventListener('load', () => {

    const el_side_menu = document.querySelector(".nav-side"); 
    const el_burger = document.querySelector("#js-burger-input"); 

    activateInitialMenuLink();
    addListenerBurgerChange(); 

    barba.init({
        transitions: [{
          name: 'opacity-transition',
          leave(data) {
            activateMenuLink(data.next.url.href);
            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.2
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.2
            });
          }
        }]
      });

    /**
     * Function to be run onload and detects url to activate the given link background from the menu
     * @author               : PS [Devpool]
     * @created              : 2021-10-26
     */
    function activateInitialMenuLink() {
        const pathname = location.pathname;
        document.querySelector(`[href="${pathname}"]`).parentElement.classList.add("item--focus");

        if (pathname === "/empty_contracts.html") {
            addContractBtnEvent("#addContract", "/empty_contracts.html", "/contracts.html"); 

        } else if (pathname === "/empty_moving.html") {
            addContractBtnEvent("#addMoving", "/empty_moving.html", "/moving.html"); 
        }
    }

    /**
     * Function to be called on page change, given the next url we activate the corresponding link and deactivate the former one
     * @author               : PS [Devpool]
     * @created              : 2021-10-26
     */
    function activateMenuLink(url) {
        const pathname_array = url.split("/");
        const pathname = pathname_array[pathname_array.length - 1]; 
        console.log("activate menu : "+pathname);
        document.querySelector(".item--focus").classList.remove("item--focus");
        document.querySelector(`a[href="/${pathname}"]`).parentElement.classList.add("item--focus");
        console.log("parent is "+document.querySelector(`a[href="/${pathname}"]`).parentElement.classList);

        if (el_burger.checked === true) {
            el_burger.checked = false; 
            el_side_menu.classList.remove("active"); 
        }
    }

    /**
     * Changes url for the a given side menu link element
     * @author               : PS [Devpool]
     * @created              : 2021-10-26
     * @param   id_btn       : id of the element we want to query
     * @param   url_query    : url of the element we want to query from the side menu
     * @param   new_url      : new url for the side menu element
     */
    function addContractBtnEvent (id_btn, url_query, new_url) {
        document.querySelector(id_btn).addEventListener("click", () => {
            console.log("change url, idbtn "+id_btn+" url_query "+url_query+" new url "+new_url);
            const el_link = document.querySelector(`[href="${url_query}"]`); 
            el_link.href = new_url;
            el_link.parentElement.classList.add("item--focus");
            console.log("parent is "+el_link.parentElement.classList);
        }) 
    }

    /* To do List */
    // Open more actions module
    document.querySelector(".more-actions").addEventListener("click", openActions);
    function openActions() {
      let element = document.querySelector(".box-actions");
      element.classList.toggle("show");
    }

    // Checked task
    let elmtChecked = document.querySelector('.doityourself');

    elmtChecked.addEventListener('click', function(e) {
      let elmtDIV = document.querySelector("#card");
      elmtDIV.classList.toggle("checked");
    });

    // Delete task
    let elmtRemove = document.querySelector('.delete');

    elmtRemove.addEventListener('click', function(e) {
      let elmtDIV = document.querySelector("#card");
      elmtDIV.remove();
    });


    /**
     * Adds listener to burger 
     * @author               : PS [Devpool]
     * @created              : 2021-10-26
     */
    function addListenerBurgerChange() {
      el_burger.addEventListener("change", (e) => {
            if (e.target.checked === true) {
                el_side_menu.classList.add("active");  
            }

            if (e.target.checked === false) {
                el_side_menu.classList.remove("active"); 
           }
        }) 
    }


function activateMenuLink(url) {
    const pathname_array = url.split("/");
    const pathname = pathname_array[pathname_array.length - 1]; 
    document.querySelector(".item--focus").classList.remove("item--focus");
    document.querySelector(`[href="/${pathname}"]`).parentElement.classList.add("item--focus");
}

/* To do List */

// Open more actions module
let elmtActions = document.querySelector(".more-actions");
elmtActions.addEventListener("click", openActions);

function openActions() {
  let element = document.querySelector(".box-actions");
  element.classList.toggle("show");
}

// Checked task
let elmtChecked = document.querySelector('.doityourself');

elmtChecked.addEventListener('click', function(e) {
  let elmtDIV = document.querySelector("#card");
  elmtDIV.classList.toggle("checked");
});

// Delete task
let elmtRemove = document.querySelector('.delete');

elmtRemove.addEventListener('click', function(e) {
  let elmtDIV = document.querySelector("#card");
  elmtDIV.remove();
});


/* Add Task - Accordion */
let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}


function addContractBtnEvent(id_btn, url_query, new_url){
    document.querySelector(id_btn).addEventListener("click", () => {
        const el_link = document.querySelector(`[href="${url_query}"]`); 
        el_link.href = new_url;
        el_link.parentElement.classList.add("item--focus");
        console.log("parent is "+el_link.parentElement.classList);
    }) 
  }

})
