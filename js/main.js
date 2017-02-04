function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid URL!');
        return false;
    }
    return true;
}

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // console.log(bookmark);

    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('bookmarkForm').reset();

    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        name = bookmarks[i].name;
        url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well row">'+
                                        '<h3 class="col-xs-9">'+name+
                                        '</h3>'+
                                        '<div class="col-xs-3">'+
                                        ' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> '+
                                        ' <a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="javascript:void(0)">Remove</a> '+
                                        '</div>'+
                                        '</div>';
    }
}

// Listen for form submit
document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);
