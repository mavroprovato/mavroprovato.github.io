$(document).ready(function(){
    $.getJSON( "/js/collection.json", function(data) {
        loadArtists(data);
    });
});

function loadArtists(data) {
    let artistList = document.getElementById('artists');
    Object.keys(data.artists)
    // Sort artists by name
        .sort((id1, id2) => data.artists[id1].name.toUpperCase().localeCompare(data.artists[id2].name))
        // Create the artist list
        .forEach(id => {
            artistList.insertAdjacentHTML('beforeend', `<li><a href="#">${data.artists[id].name}</a></li>`);
        });
}

