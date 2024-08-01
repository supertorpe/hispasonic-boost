/*************************
 * Permite ignorar usuarios: sus mensajes no aparecerán en el foro
*************************/

(function () {
    'use strict';

    ///// COMMONS /////

    let blacklist = [];

    const loadBlacklist = () => {
        blacklist = localStorage['hispasonic_blacklist'];
        if (blacklist) {
            blacklist = JSON.parse(blacklist);
        } else {
            blacklist = [];
            localStorage['hispasonic_blacklist'] = JSON.stringify(blacklist);
        }
    };

    const saveBlacklist = () => {
        localStorage['hispasonic_blacklist'] = JSON.stringify(blacklist);
    };

    const isIgnored = (theUser) => {
        return blacklist.some(blacklisted => { return blacklisted.user == theUser;});
    };

    const addCss = (css) => {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    };

    ///// OTHER USER PROFILE /////

    const btnBlockUser = document.getElementById('block-user');
    
    const initOtherUserProfileUI = () => {
        loadBlacklist();
        const user = document.querySelector('div.avatar-container > img').getAttribute('alt');
        const userIgnored = isIgnored(user);
        addCss('.icon-ignore:before{content:"\\F016"}.icon-unignore:before{content:"\\F016";color:red}');
        btnBlockUser.insertAdjacentHTML('afterend', `<button class="btn only-icon ${userIgnored ? 'icon-unignore' : 'icon-ignore'} jtip" id="ignore-user" data-help="Ignorar usuario"></button>`);
        const btnIgnoreUser = document.getElementById('ignore-user');
        // tooltip
        /*
        if (!isTouchDevice()) {
            var b = $('<div id="jtip" class="tooltip" style="text-align: center; display: none;"></div>');
            $(".jtip").mouseenter(function(h) {
                var d = this;
                $("body").append(b);
                b.html($(d).data("help"));
                var c = $(d).offset();
                var g = c.left + $(d).outerWidth() / 2 - $(b).outerWidth() / 2;
                var f = c.top - $(b).outerHeight() - 5;
                b.css({
                    left: g,
                    top: f,
                    position: "absolute"
                });
                b.show()
            }).mouseleave(function(c) {
                b.remove()
            })
        }
        */
        // btn-ignore-user click
        btnIgnoreUser.addEventListener('click', () => {
            loadBlacklist();
            if (isIgnored(user)) {
                blacklist = blacklist.filter(item => item.user !== user);
                btnIgnoreUser.classList.remove('icon-unignore');
                btnIgnoreUser.classList.add('icon-ignore');
            } else {
                blacklist.push({
                    user: user,
                    name: document.querySelector('.name>h1').textContent,
                    image:document.querySelector('.profile-container>.avatar-container>img').src
                });
                btnIgnoreUser.classList.remove('icon-ignore');
                btnIgnoreUser.classList.add('icon-unignore');
            }
            saveBlacklist();
        });
    };

    if (btnBlockUser) {
        initOtherUserProfileUI();
    }

    ///// MY ACCOUNT /////

    const accountSidebar = document.querySelector('.account.sidebar-nav');

    const initMyAccountUI = () => {
        loadBlacklist();
        const blockedUsers = document.querySelector('.users_blocked');
        blockedUsers.insertAdjacentHTML('afterend', '<li class="users_blocked users_ignored"><a href="#"><span>Usuarios ignorados</span></a></li>');
        document.querySelector('.users_ignored').addEventListener('click', () => { showIgnoredUsersForm(); });
    };

    const showIgnoredUsersForm = () => {
        loadBlacklist();
        accountSidebar.querySelectorAll('li').forEach(li => {li.classList.remove('selected')});
        document.querySelector('.users_ignored').classList.add('selected');
        const colContent = document.querySelector('.col-content');
        let html = '<div style="overflow: hidden;">';
        blacklist.forEach(item => {
            html += `<div id="ignore_${item.user}" style="float: left; width: 106px; margin-bottom: 10px; margin-right: 10px;">
            <div><a href="/usuarios/${item.user}"><img src="${item.image}" class="" width="90" height="90"></a></div>
            <div style="text-align: center;"><a href="/usuarios/${item.user}" class="user-link">${item.name}</a></div>
            <div style="text-align: center;"><a href="#" id="designorar_${item.user}" class="unblock">Designorar</a></div>
            </div>`;
        });
        html += '</div>';
        colContent.innerHTML = html;
        blacklist.forEach(item => {
            document.getElementById(`designorar_${item.user}`).addEventListener('click', () => {
                blacklist = blacklist.filter(blItem => blItem.user !== item.user);
                saveBlacklist();
                document.getElementById(`ignore_${item.user}`).style.display = 'none';
            });
        });
    };

    if (accountSidebar) {
        initMyAccountUI();
    }

    ///// FORUM LIST /////

    const topics = document.querySelector('.topics');

    const hideIgnoredTopics = () => {
        console.log(1);
        loadBlacklist();
        blacklist.forEach(blItem => {
            console.log(JSON.stringify(blItem));
            [...document.querySelectorAll('.topic>.data>.first-post>span')]
                .filter(span => span.textContent.toLowerCase() == blItem.name.toLowerCase())
                .forEach(item => {
                    item.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
                });
        });
    };

    ///// FORUM POST /////

    const topicPosts = document.querySelector('.topic-posts');

    const hideIgnoredUsers = () => {
        loadBlacklist();
        blacklist.forEach(blItem => {
            document.querySelectorAll(`.topic-post>.content>.header>a[href="/usuarios/${blItem.user.toLowerCase()}"]`).forEach(item => {
                item.parentElement.parentElement.parentElement.style.display = 'none';
            });
            document.querySelectorAll(`.users-quote>cite`).forEach(item => {
                if (item.innerText.toLowerCase().startsWith(blItem.user.toLowerCase()) || item.innerText.toLowerCase().startsWith(blItem.name.toLowerCase())) item.parentElement.style.display = 'none';
            });
        });
    };

    if (topics) {
        hideIgnoredTopics();
    } else if (topicPosts) {
        hideIgnoredUsers();
    }

})();