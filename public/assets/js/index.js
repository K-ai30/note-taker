$(document).ready(function() {
    getNotes();
    let saveBtn = $(".save-note");
    saveBtn.off().on("click", function(event) {
        event.preventDefault();
        let title = $(".note-title").first().val();
        let message = $(".note-textarea").first().val();
        $.post("/api/notes", {data: {title: title, message: message}})
        .done(function(response){
            $(".note-title").first().val("");
            $(".note-textarea").first().val("");
            getNotes();
        })
    })
})

function getNotes() {
    $.get("/api/notes")
    .done(function(response){
        $(".note-title").first().val("");
        $(".note-textarea").first().val("");
        $(".list-group").html('');
        $.each(response, function(i, note) {
            if (note.message.length) {
                let list = $(".list-group").first();
                let noteItem = `<li><span class="title">${note.title}</span><p style="display:none">${note.message}</p><i id=${i} class="fas fa-trash-alt deleteNote" ></i></li>`;
                $(list).append(noteItem);
            }
        });
        let deleteBtn = $(".deleteNote");
        deleteBtn.off().on("click", function(event) {
            event.preventDefault();
            let pos = $(this).prop("id");
           deleteByPosition(pos);
         })

         // Add handler to note click event.
         noteClickHandler()

         // Edit Button Handler
         editBtnHandler()
    })
}

function editBtnHandler(){
    let editBtn = $('.new-note');
    editBtn.off().on('click', function (event) {
        event.preventDefault();
        let pos = $('.note-title').first().attr('data-id');
        
        deleteByPosition(pos)

        let title = $(".note-title").first().val();
        let message = $(".note-textarea").first().val();

        $.post("/api/notes", { data: { title: title, message: message } })
            .done(function (response) {
                $(".note-title").first().val("");
                $(".note-textarea").first().val("");
                getNotes();
            })
    })
}

function noteClickHandler(){
    // Note click handler
    // Get all notes
    let notes = $('.list-group li');
    // Remove any current event listeners and attach new event listener when they are clicked
    notes.off().on('click', function (event) {
        event.preventDefault();
        // First select the title and message to use to populate the inputs
        let title = $('span', this).text(); // select the 'span' tag with 'this', 
        let message = $('p', this).text();

        // Set the value of the corresponding inputs to the value of the note
        $('.note-title').first().val(title);
        $('.note-textarea').first().val(message);
        // need to add the old note id so we can delete on the back end.
        $('.note-title').first().attr('data-id', $('i', this).prop('id'));
    });
}

function deleteByPosition(pos){
    $.ajax({
        url: `/api/notes/${pos}`,
        method: "post"
    })
        .done(function (response) {
            getNotes();
        })
}