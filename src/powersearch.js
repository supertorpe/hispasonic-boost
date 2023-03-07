
/*************************
 * de:usuario1,usuario2,usuario3 => busca posts de los usuarios
 * dir:+ => busca en orden (desde la primera página hasta la última). Este es el valor por defecto
 * dir:- => busca en orden inverso (desde la última página hasta la primera)
 * tam:20 => busca de 20 en 20 páginas (<= 0 para buscar en todas; valor por defecto: 10)
 * txt: texto => busca post que contengan el texto
 * gal:si => oculta el texto y muestra una galería con imágenes/vídeos
 * sim:3 => busca hilos similares por el árbol con profundidad 3 (el máximo es 5)
 * cache:clean => limpia la caché
*************************/
(function () {
    'use strict';

    const particles = ['de:', 'dir:', 'tam:', 'txt:', 'sim:', 'gal:'];

    const txtsearch = document.querySelector('.input-topicsearch');
    const btnsearch = document.querySelector('.btn-topicsearch');
    let topicPosts, topicsGroup;

    const init = () => {

        topicPosts = document.querySelector('.topic-posts');
        topicsGroup = document.querySelector('.topics');

        txtsearch.onkeypress = (evt) => {
            if (evt.keyCode == 13) {
                return search();
            }
        };

        btnsearch.onclick = () => {
            return search();
        };

        initUI();

    };

    const initUI = () => {
        // PowerSearch button
        btnsearch.insertAdjacentHTML('afterend', '<button id="btn-power-search" type="button" class="btn btn-primary">Power Search</button>');
        const modalHtml = `<div id="hispasonic-power-modal" class="block" style="display: none">
        <div class="header">
            <h2>Búsqueda</h2>
        </div>
        <div class="body">
            <ul class="form">
                <li><label for="hps_de">Usuarios</label>
                    <div><input type="text" class="hps_de" size="30" value="">
                        <div class="desc">Sólo mostrará mensajes de los ousuarios indicados -separados por coma (,)-. Ejemplo: soyuz,carmelo</div>
                    </div>
                </li>
                <li><label for="hps_txt">Con el texto</label>
                    <div><input type="text" class="hps_txt" size="30" value="">
                        <div class="desc">Sólo mostrará mensajes que incluyan el texto indicado</div>
                    </div>
                    <label for="hps_gal">Mostrar galería</label><input type="checkbox" class="hps_gal" value="1">
                </li>
                <li><label for="hps_dir">Mostrar primero</label>
                    <div><select class="hps_dir">
                            <option value="+">Los más antiguos</option>
                            <option value="-">Los más recientes</option>
                        </select>
                    </div>
                </li>
                <li><label for="hps_tam">Tamaño de bloque</label>
                    <div><select class="hps_tam">
                            <option value="5">5 páginas</option>
                            <option value="10">10 páginas</option>
                            <option value="20">20 páginas</option>
                        </select>
                        <div class="desc">Se lanza la búsqueda de 'n en n' páginas</div>
                    </div>
                </li>
                <li><label for="hps_sim">Similares</label>
                    <div><select class="hps_sim">
                            <option value="">No</option>
                            <option value="1">Profundidad 1</option>
                            <option value="3">Profundidad 3</option>
                            <option value="5">Profundidad 5</option>
                        </select>
                        <div class="desc">Rastrea por el árbol de hilos similares</div>
                    </div>
                </li>
                <li>
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <button type="button" class="btn btn-primary" onclick="window.postMessage('hispasonic-power-search', '*');">Buscar</button>
                        <div class="missing-desc power-search-error" style="display: none;">Debes indicar algún usuario o galería o bien búsqueda de hilos similares</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.getElementById('btn-power-search').addEventListener('click', () => {
            document.querySelectorAll('.power-search-error').forEach(item => item.style.display = 'none');
            modal.open('hispasonic-power-modal');
        });
        window.addEventListener("message", function (msg) {
            doModalSearch();
        });
    };

    const doModalSearch = () => {
        const de = document.querySelector('.modal-visible .hps_de').value;
        const sim = Number(document.querySelector('.modal-visible .hps_sim').value);
        const gal = document.querySelector('.modal-visible .hps_gal').checked;
        if (!de && !gal && !sim) {
            document.querySelector('.modal-visible .power-search-error').style.display = 'block';
        } else {
            const txt = document.querySelector('.modal-visible .hps_txt').value;
            txtsearch.value = `dir:${document.querySelector('.modal-visible .hps_dir').value} `;
            txtsearch.value += `tam:${document.querySelector('.modal-visible .hps_tam').value} `;
            if (de) txtsearch.value += `de:${de} `;
            if (txt) txtsearch.value += `txt:${txt} `;
            if (sim) txtsearch.value += `sim:${sim} `;
            if (gal) txtsearch.value += 'gal:si';
            modal.close('hispasonic-power-modal');
            search();
        }
    };

    const search = () => {
        const searchValue = txtsearch.value;
        if (searchValue === 'cache:clean') {
            for (let key in localStorage) {
                if (key.startsWith('hispasonic_cache_')) {
                    localStorage.removeItem(key);
                }
            }
            txtsearch.value = '';
            return false;
        }
        if (particles.some((particle) => {
            return searchValue.startsWith(particle);
        })) {
            doSearch(parseSearchValue(searchValue));
            return false;
        }
        return true;
    };

    const parseSearchValue = (searchValue) => {
        const result = {};
        let idxBlank, part;
        while (searchValue.length) {
            switch (true) {
                case searchValue.startsWith('de:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(3, idxBlank) : searchValue.substring(3);
                    searchValue = searchValue.substring(4 + part.length);
                    result.de = part.toUpperCase().split(',');
                    break;
                case searchValue.startsWith('dir:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    result.dir = part == '+';
                    break;
                case searchValue.startsWith('tam:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    part = Number(part);
                    if (Object.is(part, NaN))
                        part = 10;
                    result.tam = part;
                    break;
                case searchValue.startsWith('txt:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    result.txt = part.toUpperCase();
                    break;
                case searchValue.startsWith('sim:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    part = Number(part);
                    if (Object.is(part, NaN) || part > 5)
                        part = 5;
                    result.sim = part;
                    result.similarPostsUrls = [];
                    break;
                case searchValue.startsWith('gal:si'):
                    idxBlank = searchValue.indexOf(' ');
                    searchValue = searchValue.substring(idxBlank > 0 ? idxBlank + 1 : 6);
                    result.gal = true;
                    break;
            }
        }
        if ((result.de || result.gal) && !result.hasOwnProperty('tam')) {
            result.tam = 10;
        }
        if (!result.hasOwnProperty('dir')) {
            result.dir = true;
        }
        return result;
    };

    const doSearch = (searchInfo) => {
        searchInfo.pageUrl = document.head.querySelector('meta[property="og:url"]').content;
        const idx = searchInfo.pageUrl.indexOf('/pagina');
        if (idx >= 0)
            searchInfo.pageUrl = searchInfo.pageUrl.substring(0, idx);
        // calc last page
        if (!document.querySelector('.pagination')) {
            searchInfo.lastPage = 1;
        } else {
            let lastPageElem = document.querySelector('.pagination>li:last-child>a');
            if (lastPageElem) {
                searchInfo.lastPage = Number(lastPageElem.href.substring(lastPageElem.href.lastIndexOf('/pagina') + 7));
            } else {
                searchInfo.lastPage = Number(document.querySelector('.pagination>li:last-child>span').textContent);
            }
        }
        // run search
        if (searchInfo.de || searchInfo.gal) {
            searchUserPosts(searchInfo);
        }
        if (searchInfo.sim) {
            searchSimilarPosts(searchInfo);
        }
    };

    const searchUserPosts = (searchInfo) => {
        // transform paginator
        document.querySelectorAll('.pagination').forEach(pagination => {
            const paginationChildren = pagination.children;
            for (let paginationLi of paginationChildren) {
                paginationLi.style.display = 'none';
            }
            pagination.insertAdjacentHTML('afterbegin', '<li><a class="buscar-mas" style="display:none">buscar m&aacute;s</a></li>');
        });
        document.querySelectorAll('.buscar-mas').forEach(button => {
            button.onclick = () => {
                document.querySelectorAll('.buscar-mas').forEach(btn => {
                    btn.style.display = "none";
                });
                searchInfo.pageNum += searchInfo.dir ? searchInfo.tam : -searchInfo.tam;
                searchInfo.limitPageNumber = searchInfo.pageNum + (searchInfo.dir ? searchInfo.tam - 1 : -searchInfo.tam + 1);
                if (searchInfo.limitPageNumber < 1) searchInfo.limitPageNumber = 1;
                else if (searchInfo.limitPageNumber > searchInfo.lastPage) searchInfo.limitPageNumber = searchInfo.lastPage;
                searchUserPostsInPages(searchInfo);
            };
        });
        if (searchInfo.gal) {
            // build gallery structure
            document.querySelector('.topic-posts').innerHTML = '<div class="topic-post"><div id="topic-gallery" style="overflow: hidden;"></div></div>';
        } else {
            // clean posts
            document.querySelectorAll('.topic-post').forEach(topicPost => {
                topicPost.remove();
            });
        }
        // search user posts
        searchInfo.pageNum = searchInfo.dir ? 1 : searchInfo.lastPage;
        searchInfo.limitPageNumber = searchInfo.pageNum + (searchInfo.dir ? searchInfo.tam - 1 : -searchInfo.tam + 1);
        if (searchInfo.limitPageNumber < 1) searchInfo.limitPageNumber = 1;
        else if (searchInfo.limitPageNumber > searchInfo.lastPage) searchInfo.limitPageNumber = searchInfo.lastPage;
        searchUserPostsInPages(searchInfo);
    };

    const searchUserPostsInPages = (searchInfo) => {
        const url = (searchInfo.pageNum == 1 ? searchInfo.pageUrl : `${searchInfo.pageUrl}/pagina${searchInfo.pageNum}`);
        let pageContent = localStorage[`hispasonic_cache_${url}`];
        if (pageContent) {
            pageContent = LZString.decompress(pageContent);
            processPage(searchInfo, pageContent);
        } else {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    let pageContent = request.responseText;
                    if (searchInfo.pageNum != searchInfo.lastPage) {
                        try { localStorage[`hispasonic_cache_${url}`] = LZString.compress(pageContent); } catch (error) { console.log(error); }
                    }
                    processPage(searchInfo, pageContent);
                }
            };
            request.send(null);
        }
    };

    const processPage = (searchInfo, pageContent) => {
        const topicPosts = document.querySelector('.topic-posts');
        const htmlDoc = new DOMParser().parseFromString(pageContent, 'text/html');
        let posts = Array.from(htmlDoc.querySelectorAll('.topic-post'));
        if (!searchInfo.dir) {
            posts = posts.reverse();
        }
        posts.forEach(topicPost => {
            const link = topicPost.querySelector('.content>.header>a[href*="/usuarios/"]');
            const postUrl = topicPost.querySelector('.content>.header>a[href*="/foros/"]').href;
            if (link) {
                const authorUrl = link.href;
                const postAuthor = authorUrl.substring(authorUrl.lastIndexOf('/') + 1);
                if (!searchInfo.de || searchInfo.de.some((user) => {
                    return authorUrl.toUpperCase().indexOf(user) >= 0 || link.innerText.toUpperCase().indexOf(user) >= 0;
                })) {
                    if (!searchInfo.txt || topicPost.textContent.toUpperCase().indexOf(searchInfo.txt) >= 0) {
                        if (searchInfo.gal) {
                            // add images
                            topicPost.querySelectorAll('.content>.richtext img').forEach(image => {
                                if (image.dataset && image.dataset.src && image.dataset.src.indexOf('/smilies/') == -1)
                                    topicPosts.insertAdjacentHTML('beforeend', `<div style="float: left; width: 106px; margin-bottom: 10px; margin-right: 10px;">
                                        <div><a data-fslightbox="gallery" data-type="image" href="${image.dataset.src}"><img src="${image.dataset.src}" class="" width="90" height="90"></a></div>
                                        <div style="text-align: center;"><a href="${postUrl}" class="user-link">${postAuthor}</a></div>
                                        </div>`);
                            });
                            // add youtube
                            topicPost.querySelectorAll(".youtube").forEach(youtube => {
                                topicPosts.insertAdjacentHTML('beforeend', `<div style="float: left; width: 106px; margin-bottom: 10px; margin-right: 10px;">
                                    <div><a data-fslightbox="gallery" data-type="youtube" href="https://www.youtube.com/embed/${youtube.dataset.embed}"><img src="https://img.youtube.com/vi/${youtube.dataset.embed}/hqdefault.jpg" class="" width="90" height="90"></a></div>
                                    <div style="text-align: center;"><a href="${postUrl}" class="user-link">${postAuthor}</a></div>
                                    </div>`);
                            });
                        } else {
                            // fix images
                            topicPost.querySelectorAll('img').forEach(image => {
                                if (image.dataset && image.dataset.src) image.src = image.dataset.src;
                            });
                            // fix youtube
                            topicPost.querySelectorAll(".youtube").forEach(youtube => {
                                const image = new Image();
                                image.src = "https://img.youtube.com/vi/" + youtube.dataset.embed + "/hqdefault.jpg";
                                image.addEventListener("load", function () { youtube.appendChild(image); });
                                youtube.addEventListener("click", function () {
                                    const iframe = document.createElement("iframe");
                                    iframe.setAttribute("frameborder", "0");
                                    iframe.setAttribute("allowfullscreen", "");
                                    iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
                                    this.innerHTML = "";
                                    this.appendChild(iframe);
                                });
                            });
                            topicPosts.appendChild(topicPost);
                        }
                    }
                }
            }
        });
        if (searchInfo.gal) {
            refreshFsLightbox();
        }
        searchInfo.pageNum += (searchInfo.dir ? 1 : -1);
        if (searchInfo.pageNum >= 1 && searchInfo.pageNum <= searchInfo.lastPage) {
            if (searchInfo.dir && searchInfo.pageNum <= searchInfo.limitPageNumber ||
                !searchInfo.dir && searchInfo.pageNum >= searchInfo.limitPageNumber) {
                searchUserPostsInPages(searchInfo);
            } else {
                document.querySelectorAll('.buscar-mas').forEach(button => {
                    button.style.display = "block";
                });
            }
        }
    };

    const searchSimilarPosts = (searchInfo) => {
        if (!topicsGroup) return;
        if (!searchInfo.de) {
            topicPosts.style.display = 'none';
        }
        topicsGroup.querySelectorAll('li>.topic>.data>h2>.title>a').forEach(link => {
            searchInfo.similarPostsUrls.push(link.href);
        });
        searchSimilar(searchInfo, searchInfo.similarPostsUrls, 1, searchInfo.sim);

    };

    const searchSimilar = (searchInfo, searchUrls, currentDepth, maxDepth) => {
        if (currentDepth > maxDepth) {
            return;
        }
        searchUrls.forEach(url => {
            let pageContent = localStorage[`hispasonic_cache_${url}`];
            if (pageContent) {
                pageContent = LZString.decompress(pageContent);
                processPageSimilarPosts(url, searchInfo, currentDepth, maxDepth, pageContent);
            } else {
                const request = new XMLHttpRequest();
                request.open("GET", url);
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let pageContent = request.responseText;
                        try { localStorage[`hispasonic_cache_${url}`] = LZString.compress(pageContent); } catch (error) { console.log(error); }
                        processPageSimilarPosts(url, searchInfo, currentDepth, maxDepth, pageContent);
                    }
                };
                request.send(null);
            }
        });
    };

    const processPageSimilarPosts = (url, searchInfo, currentDepth, maxDepth, pageContent) => {
        const parentLi = document.querySelector(`li>.topic>.data>h2>.title>a[href="${url.replace('https://www.hispasonic.com', '')}"`).parentNode.parentNode.parentNode.parentNode.parentNode;
        const htmlDoc = new DOMParser().parseFromString(pageContent, 'text/html');

        const simPosts = htmlDoc.querySelectorAll('.topics>li');
        const simPostsUrls = [];

        simPosts.forEach(simPost => {
            simPost.style.marginLeft = `${currentDepth * 20}px`;
            const link = simPost.querySelector('.topic>.data>h2>.title>a');
            const simPostUrl = link.href;
            if (searchInfo.similarPostsUrls.indexOf(simPostUrl) == -1) {
                if (!searchInfo.txt || simPost.textContent.toUpperCase().indexOf(searchInfo.txt) >= 0) {
                    simPost.querySelectorAll('img').forEach(image => {
                        if (image.dataset && image.dataset.src) image.src = image.dataset.src;
                    });
                    //topicsGroup.appendChild(simPost);
                    parentLi.parentNode.insertBefore(simPost, parentLi.nextSibling);
                    simPostsUrls.push(simPostUrl);
                    searchInfo.similarPostsUrls.push(simPostUrl);
                }
            }
        });
        searchSimilar(searchInfo, simPostsUrls, currentDepth + 1, maxDepth);
    };

    if (txtsearch && btnsearch) {
        init();
    }

})();
