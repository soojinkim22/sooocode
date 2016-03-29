"use strict";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//
// H E L P E R    F U N C T I O N S
//
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Function to check if we clicked inside an element with a particular class
 * name.
 *
 * @param {Object} e The event
 * @param {String} className The class name to check against
 * @return {Boolean}
 */
function clickInsideElement(e:any, className:any) {
    var element:any = e.srcElement || e.target;

    if (element.classList.contains(className)) {
        return element;
    } else {
        while (element = element.parentNode) {
            if (element.classList && element.classList.contains(className)) {
                return element;
            }
        }
    }

    return false;
}

/**
 * Get's exact position of event.
 *
 * @param {Object} e The event passed in
 * @return {Object} Returns the x and y position
 */
function getPosition(e:any) {
    var position_x = 0;
    var position_y = 0;

    if (!e) var e:any = window.event;

    if (e.pageX || e.pageY) {
        position_x = e.pageX;
        position_y = e.pageY;
    } else if (e.clientX || e.clientY) {
        position_x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        position_y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {x: position_x, y: position_y};
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//
// C O R E    F U N C T I O N S
//
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Variables.
 */
var contextMenuLinkClassName:string = "context-menu__link";
var contextMenuActive:string = "context-menu--active";
var taskItemClassName:string = "task";
var taskItemInContext:any;
var clickCoords:any;
var clickCoordsX:number;
var clickCoordsY:any;

var menu:any = document.querySelector("#context-menu");
var menuState:number = 0;
var menuWidth:number;
var menuHeight:number;

var windowWidth:number;
var windowHeight:number;

/**
 * Initialise our application's code.
 */
function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
}
 
/**
 * Listens for contextmenu events.
 */
function contextListener() {
    document.addEventListener("contextmenu", (e:any) => {
        taskItemInContext = clickInsideElement(e, taskItemClassName);

        if (taskItemInContext) {
            e.preventDefault();
            toggleMenuOn();
            positionMenu(e);
        } else {
            taskItemInContext = null;
            toggleMenuOff();
        }
    });
}

/**
 * Listens for click events.
 */
function clickListener() {
    document.addEventListener("click", (e:any) => {
        var clickeElIsLink:any = clickInsideElement(e, contextMenuLinkClassName);

        if (clickeElIsLink) {
            e.preventDefault();
            menuItemListener(clickeElIsLink);
        } else {
            var button:any = e.which || e.button;
            if (button === 1) {
                toggleMenuOff();
            }
        }
    });
}

/**
 * Listens for keyup events.
 */
function keyupListener() {
    window.onkeyup = (e:any) => {
        if (e.keyCode === 27) {
            toggleMenuOff();
        }
    };
}

/**
 * Window resize event listener
 */
function resizeListener() {
    window.onresize = (e:any) => {
        toggleMenuOff();
    };
}

/**
 * Turns the custom context menu on.
 */
function toggleMenuOn() {
    if (menuState !== 1) {
        menuState = 1;
        menu.classList.add(contextMenuActive);
    }
}

/**
 * Turns the custom context menu off.
 */
function toggleMenuOff() {
    if (menuState !== 0) {
        menuState = 0;
        menu.classList.remove(contextMenuActive);
    }
}

/**
 * Positions the menu properly.
 *
 * @param {Object} e The event
 */
function positionMenu(e:any) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ((windowWidth - clickCoordsX) < menuWidth) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px";
    }

    if ((windowHeight - clickCoordsY) < menuHeight) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px";
    }
}

/**
 * Dummy action function that logs an action when a menu item link is clicked
 *
 * @param {HTMLElement} link The link that was clicked
 */
function menuItemListener(link) {
    console.log("Task ID - " + taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
    toggleMenuOff();
}

/**
 * Run the app.
 */
init();

