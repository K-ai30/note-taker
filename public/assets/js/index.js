$(document).ready(function() {
    getNotes();
    let saveBtn = $(".save-note");
    saveBtn.on("click", function() {
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
        $.each(response, function(i, note) {
            if (note.message.length) {
                let list = $(".list-group").first();
                let noteItem = `<li>${note.title}<p style="display:none">${note.message}</p><i id=${note.id} class="fas fa-trash-alt deleteNote" ></i></li>`;
                $(list).append(noteItem);
            }
        });
        let deleteBtn = $(".deleteNote");
        deleteBtn.on("click", function() {
        let pos = $(this).prop("id");
        debugger
        $.ajax({ url: `/api/notes/${pos}`, method: "DELETE" })
        .done(function(response){
            debugger
            getNotes();
        })
     })
    })
}
