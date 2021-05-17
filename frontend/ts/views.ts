//@ts-ignore
let frontend_url: string = window.frontend_url;

function load_version_string() {
    $.get({
        url: frontend_url+"version.txt",
        success: function(data) {
            var backend_version = $(".version").html();
            $(".version").html(backend_version + " . " + data);
        }
    });
}

$(document).ready(function() {
    console.log("Views code initialized.");
    if($(".version").length > 0){
        load_version_string();
    }
});
