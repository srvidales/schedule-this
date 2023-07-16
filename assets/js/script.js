// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

    /**
     * Using jQuery, adds click listeners to every button which upon triggered
     * either save the text from the corresponding textarea to local storage
     * using the parent id as the key if text is not blank or remove the item
     * from local storage otherwise.
     */
    function addListeners() {
        $('button').on('click', function() {
            const hourEl = $(this).parent();
            const hourId = hourEl.attr('id')
            const textAreaEl = $(this).prev('textarea');
            if (textAreaEl.val() !== '') {
                localStorage.setItem(hourId, textAreaEl.val())
            } else {
                localStorage.removeItem(hourId)
            }
        })
    }

    addListeners();

    /**
     * Using jQuery, toggles the past, present and future classes of the
     * hour elements on and off depending on the current time as retrieved
     * using days.js.
     */
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    function applyClass () {
        const hourEls = $('div[id^="hour-"]')
        const hourNow = Number.parseInt(dayjs().format('H'))
        hourEls.each(function (index, element) {
            const hour = Number.parseInt($(this).attr('id').substring(5))
            element.classList.toggle('past', hour < hourNow)
            element.classList.toggle('present', hour === hourNow)
            element.classList.toggle('future', hour > hourNow)
        });
    }

    applyClass();

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

    /**
     * Using jQuery, loads the corresponding text from local storage to the
     * corresponding textarea element using parent id as the key.
     */
    function loadText () {
        const textAreas = $('textarea')
        textAreas.each(function (index, element) {
            const key = $(this).parent().attr('id')
            const text = localStorage.getItem(key)
            if (text !== null) {
                element.value = text
            }
        });
    }

    loadText()

  // TODO: Add code to display the current date in the header of the page.

    /**
     * Using jQuery and days.js retrieve the date in the necessary format and
     * update the corresponding element with it.
     */
    function displayDate () {
        dayjs.extend(window.dayjs_plugin_advancedFormat)
        const currentDayEl = $('#currentDay')
        currentDayEl.text(dayjs().format('dddd, MMMM Do'))
    }

    displayDate();

});
