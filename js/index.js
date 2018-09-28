// URL of the github repository
let githubUsername = 'mavroprovato';
let githubReposUrl = `https://api.github.com/users/${githubUsername}/repos`;
// Github repositories to include
let repos = ['spring-cms', 'symfony-cms', 'django-cms', 'algorithms', 'qt-scintilla-editor'];

$(document).ready(function() {
    $.get(githubReposUrl, function (data) {
        // Load repository information
        $.each(data, function(index, value) {
            if (!repos.includes(value.name)) {
                return;
            }
            $("#github-repos").append(`
                <dt><a href="${value.html_url}">${value.name}</a></dt>
                <dd id="${value.name}">${value.description}&nbsp;</dd>
            `);
            // Show topics for repository
            $.ajax({
                type: "GET",
                url: `https://api.github.com/repos/${githubUsername}/${value.name}/topics`,
                headers: {
                    'Accept': 'application/vnd.github.mercy-preview+json'
                },
                success: function (data) {
                    $(`dd[id=${value.name}]`).append(
                        '<span class="badge badge-light">' + data.names.join('</span>&nbsp;<span class="badge badge-info">') + '</span>'
                    );
                }
            });
        });
    }).error(function (error) {
        console.error(`Request failed with error: ${error.status}`);
        $("#github-section").hide();
    });
});
