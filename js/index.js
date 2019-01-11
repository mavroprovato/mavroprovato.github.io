// URL of the github repository
let githubUsername = 'mavroprovato';
let githubReposUrl = `https://api.github.com/users/${githubUsername}/repos`;
// Github repositories to include
let repos = ['spring-cms', 'symfony-cms', 'django-cms', 'algorithms', 'collection-manager', 'qt-scintilla-editor'];

$(document).ready(function() {
    $.get(githubReposUrl, function (data) {
        // Load repository information
        $.each(data, function(index, value) {
            if (!repos.includes(value.name)) {
                return;
            }
            $("#github-repos").append(`
                <dt id="${value.name}"><a href="${value.html_url}">${value.name}</a>&nbsp;</dt>
                <dd>${value.description}&nbsp;</dd>
            `);
            // Show topics for repository
            $.get({
                url: `https://api.github.com/repos/${githubUsername}/${value.name}/topics`,
                headers: {
                    'Accept': 'application/vnd.github.mercy-preview+json'
                },
                success: function (data) {
                    $(`dt[id=${value.name}]`).append($.map(data.names, function(value) {
                        return `<span class="badge badge-info">${value}</span>&nbsp;`
                    }).join(''));
                }
            });
        });
    }).fail(function (error) {
        console.error(`Request failed with error: ${error.status}`);
        $("#github-section").hide();
    });
});
