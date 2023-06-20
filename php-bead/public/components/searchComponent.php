<div id="searchDiv">
    <input type="search" name="search" id="searchInput">
    <button type="button" onclick="searchTracks()">Search</button>
</div>
<script>
    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            searchTracks();
        }
    });

    function searchTracks() {
        window.location.href = 'tracks.php?search=' + document.getElementById('searchInput').value;
    }
</script>