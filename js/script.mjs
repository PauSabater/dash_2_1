window.addEventListener('load', () => {

    activateInitialMenuLink();

    barba.init({
        transitions: [{
          name: 'opacity-transition',
          leave(data) {
            activateMenuLink(data.next.url.href);
            return gsap.to(data.current.container, {
              opacity: 0
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0
            });
          }
        }]
      });

function activateInitialMenuLink() {
    const pathname = location.pathname;
    document.querySelector(`[href="${pathname}"]`).parentElement.classList.add("item--focus");

    if (pathname === "/empty_contracts.html") {
        addContractBtnEvent("#addContract", "/empty_contracts.html", "/contracts.html"); 

    } else if (pathname === "/empty_moving.html") {
        addContractBtnEvent("#addMoving", "/empty_moving.html", "/moving.html"); 
    }
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
