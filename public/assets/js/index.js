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
            let list = $(".list-group").first();
            let noteItem = `<li><h4>${note.title}</h4><p>${note.message}</p></li>`;
            $(list).append(noteItem);
        });
    })
}