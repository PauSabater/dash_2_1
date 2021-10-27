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
            const url = data.next.url.href;
            const url_array = url.split("/");
            const pathname = url_array[url_array.length - 1]; 

            if (pathname === "moving.html") { 
                executeMoveFunctions();
            }

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

        if (pathname === "/moving.html") {
            executeMoveFunctions();
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
        
        if (pathname !== "moving-step-01.html" && pathname !== "moving-step-02.html" && pathname !== "moving-step-03.html" && pathname !== "moving-step-04.html" && pathname !== "moving") {
            document.querySelector(".item--focus").classList.remove("item--focus");
            document.querySelector(`a[href="/${pathname}"]`).parentElement.classList.add("item--focus");
        }

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
            const el_link = document.querySelector(`[href="${url_query}"]`); 
            el_link.href = new_url;
            el_link.parentElement.classList.add("item--focus");
        }) 
    }

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

    //_______________________________________________________________________________________________________________________________________________________________//


function executeMoveFunctions(){

    // Open more actions module
    let elmtActions = document.getElementsByClassName("more-actions");

    for (let i = 0; i < elmtActions.length; i++) {
      elmtActions[i].addEventListener("click", openActions);
    }

    function openActions() {
        let allChild = this.parentNode.getElementsByClassName("box-actions");
        //let element = document.querySelector(".box-actions");
        for (let i = 0; i < allChild.length; i++) {
            allChild[i].classList.toggle("show");
        }
    }

    // Progress bar function
    function progressBarFinishState() {
        let progressBarAll = document.querySelectorAll('#progressbar li')
        let fullActive = true;
        let fullFinish = true;
        for (const li of Array.from(progressBarAll)){
          if (! li.classList.contains("active")){
            fullActive = false;
          }
          if (! li.classList.contains("finish")){
            fullFinish = false;
          }
        }
        if (fullActive === true){
          for (const li of Array.from(progressBarAll)){
            li.classList.remove('active');
            li.classList.add('finish');
          }
        }
        else if (fullFinish === false){
          for (const li of Array.from(progressBarAll)){
            if (li.classList.contains("finish")){
              li.classList.add('active');
              li.classList.remove('finish');
            }
          }
        }
      }
    function progressBarNext() {
      if (document.querySelector("#progressbar li:not(.active)") != null && document.querySelector("#progressbar li.finish") === null ){
        let progressBarNext = document.querySelector("#progressbar li:not(.active)");
        progressBarNext.classList.add('active')
        progressBarFinishState()
      }
    }
    function progressBarBack() {
      let progressBarBack = Array.from(document.querySelectorAll('#progressbar li.active')).pop();
      progressBarBack.classList.remove('active');
    }
    function progressBarAddTask() {
      let progressBar = document.getElementById("progressbar");
      let li = document.createElement("li");
      progressBar.appendChild(li);
      progressBarFinishState();
    }
    function progressBarRemoveTask() {
      let progressBarLast = document.querySelector("#progressbar li:last-child");
      progressBarLast.remove()
      if (document.querySelector("li:not(.active)").length == 0) {
        let progressBarLastActive = document.querySelector("#progressbar li:last-child");
        progressBarLastActive.classList.remove('active');
        progressBarLastActive.classList.add('finish');
        progressBarFinishState();
      }
    }

    // Checked task
    let elmtChecked = document.querySelector('.doityourself');
    let closeMovingDone = false; 

    elmtChecked.addEventListener('click', function(e) {
      /* Moving - Button Cloturer demenagment */

      if(closeMovingDone === false) {

        let btnCloseMoving = document.querySelector('.mover-step__btn');

        btnCloseMoving.addEventListener('click', function(e) {
          btnCloseMoving.style.background = '#000000';
          btnCloseMoving.style.textDecoration = "line-through";
          btnCloseMoving.style.opacity = "0.3";
          closeMovingDone = true;
        })
      }

      let elmtDIV = document.querySelector("#card");
      elmtDIV.classList.toggle("checked");
      if (elmtDIV.classList.contains("checked")){
        progressBarNext();
      }
      else {
        progressBarBack();
      }
    });

    // Delete task
    let elmtRemove = document.querySelector('.delete');

    elmtRemove.addEventListener('click', function(e) {
      let elmtDIV = document.querySelector("#card");
      elmtDIV.remove();
      progressBarRemoveTask();
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
        panel.addEventListener("click", function() {
            progressBarAddTask()
        })
      });
    }
  
  }
}  
);
