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

      /*
function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
    return gsap.fromTo(loader,
        {
            rotation: 10,
            scaleX: 0,
            xPercent: -5
        },
        {
            duration: 0.8,
            xPercent: 0,
            scaleX: 1,
            rotation: 0,
            ease: 'power4.inOut',
            transformOrigin: 'left center'
        });
}


function loaderAway() {
    // GSAP tween to hide loading screen
    return gsap.to(loader, {
        duration: 0.8,
        scaleX: 0,
        xPercent: 5,
        rotation: -10,
        transformOrigin: 'right center',
        ease: 'power4.inOut'
    });
}
*/

function activateInitialMenuLink() {
  console.log("path is "+location.pathname);
  document.querySelector(`[href="${location.pathname}"]`).parentElement.classList.add("item--focus");
}

function activateMenuLink(url) {
    const pathname_array = url.split("/");
    const pathname = pathname_array[pathname_array.length - 1]; 
    document.querySelector(".item--focus").classList.remove("item--focus");
    document.querySelector(`[href="/${pathname}"]`).parentElement.classList.add("item--focus");
}

})

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

/* Add Task - Accordion  */
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