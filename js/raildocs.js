$(function () {

    /* Info Architecture

     --- level 1 (tabs)
     ------ level 2 (category, collection of md files) (this is a single content panel)
     --------- level 3 (sub category, 1 md file)
     ------------ level 4 (md file h1's)

     */

    var tree = {
        'Documentation': {
            'Guidelines': {
                'Rules & Formatting': 'rules-and-guidelines.md',
                'Syntax Reference': 'syntax.md',
                'How To Create New Pages & Categories': 'creating-new-pages.md',
                'Pushing Changes': 'pushing-changes.md'
            }
        },

        'splitter-1': true,

        'Environments, Deployment, & Sysops': {
            'Local Development Environments': {
                'Getting Started / Pre Setup': 'getting-started.md',
                'Drumeo Setup': 'drumeo.md',
                'Pianote Setup': 'pianote.md',
                'Guitar Lessons Setup': 'guitarlessons.md',
                'Static/Misc Sites Setup': 'misc-sites.md',
                'Helper Links & Commands': 'helper-links-and-commands.md',
                'Pulling Production Databases': 'pulling-production-databases.md',
                'PHPStorm Debugging & PHPUnit': 'php-debugging.md'
            },
            'How To Deploy': {
                'Drumeo': 'deploying-drumeo.md',
                'Drumeo Forums': 'deploying-drumeo-forums.md',
                'Pianote': 'deploying-pianote.md',
                'Misc Sites': 'deploying-misc-sites.md'
            },
            'Production Emergency Procedure': {
                'Drumeo Production Server Procedure': 'production-server-down.md',
                'Infusionsoft API Down/Offline Procedure': 'infusionsoft-api-down.md'
            },
            'Sysops Guides': {
                'Creating A Kubernetes Cluster': 'creating-a-new-kubernetes-cluster.md',
                'Connecting To Kubernetes Cluster': 'connecting-to-existing-kubernetes-cluster.md',
                'Using Our ELK Stack': 'elk-stack.md',
                'Setting Up A AWS VPC': 'setting-up-a-aws-vpc.md',
                'AWS EBS Cron Jobs': 'aws-ebs-cron-jobs.md'
            },
            'PHPStorm Guides & Reference': {
                'Advanced Find & Replace': 'find-and-replace.md'
            }
        },
        'Programming': {
            'Tutorials': {
                'Package Development Workflow': 'package-development-workflow.md'
            },
            'Management': {
                'Updating Drumeo Wordpress': 'updating-wordpress.md'
            }
        },
        'Front End': {
            'Deployment': {
                'Drumeo': {
                    'Drumeo': 'deploying-drumeo.md',
                    'Drumeo Forums': 'deploying-drumeo-forums.md',
                    'Pianote': 'deploying-pianote.md',
                    'Misc Sites': 'deploying-misc-sites.md'
                }
            }
        },
        'Misc Dev': {},

        'splitter-2': true,

        'Support': {
            'Reporting Bugs': {
                'How To Report A Bug': 'how-to-report-bugs.md'
            }
        },

        'Accounting': {
            'Monthly Numbers': {
                'Explained': 'deploying-misc-sites.md',
                'Links': 'deploying-misc-sites.md'
            },
            'Monthly Data Dump': {
                'Explained': 'deploying-misc-sites.md',
                'Links': 'deploying-misc-sites.md'
            }
        }
    };

    /*
     Objects
     */

    function Level(title, depth) {
        this.title = title;
        this.depth = depth;
        this.subLevels = [];
        this.markdownHtml = '';
        this.subLevelContainerElement = undefined;

        this.find = function (title) {
            var levelToReturn = undefined;

            this.subLevels.forEach(function (level) {
                if (level.title === title) {
                    levelToReturn = level;
                }
            });

            return levelToReturn;
        }
    }

    var baseLevel = new Level('base', 0);

    var converter = new showdown.Converter();
    converter.setFlavor('github');

    buildLevel1List();
    buildLevel2List('Environments, Deployment, & Sysops');
    buildLevel3List('Environments, Deployment, & Sysops', 'Local Development Environments');
    buildLevel4List(
        'Environments, Deployment, & Sysops',
        'Local Development Environments',
        'Getting Started / Pre Setup'
    );

    function buildLevel1List() {
        var level1Ul = $('#level-1-ul');
        var level1LiTemplate = $('#html-templates .level-1-li-template').clone();
        var liDividerTemplate = $('#html-templates .li-divider-template').clone();

        for (var level1Title in tree) {
            if (tree.hasOwnProperty(level1Title)) {

                var level1Element;

                if (level1Title.slice(0, 8) === 'splitter') {
                    level1Ul.append(liDividerTemplate.clone());
                } else {
                    level1Element = level1LiTemplate.clone();

                    level1Element.find('.level-1-title-template')
                        .text(level1Title)
                        .attr('data-title', level1Title);

                    level1Ul.append(level1Element);

                    var level = new Level(level1Title, 1);
                    baseLevel.subLevels.push(level);
                }

            }
        }
    }

    function buildLevel2List(level1Title) {
        var level2Ul = $('#level-2-ul');
        var level2LiTemplate = $('#html-templates .level-2-li-template').clone();

        var level1Tree = tree[level1Title];

        for (var level2Title in level1Tree) {
            if (level1Tree.hasOwnProperty(level2Title)) {

                var level2Element;

                level2Element = level2LiTemplate.clone();
                level2Element.find('.level-2-title').text(level2Title).attr('data-title', level2Title);

                level2Ul.append(level2Element);

                var level = new Level(level2Title, 2);
                level.subLevelContainerElement = level2Element.find('.level-3-ul');

                baseLevel.find(level1Title).subLevels.push(level)
            }
        }

        console.log(baseLevel);
    }

    function buildLevel3List(level1Title, level2Title) {
        var parentLevel = baseLevel
            .find(level1Title)
            .find(level2Title);

        var level3LiTemplate = $('#html-templates .level-3-li-template').clone();

        var level2Tree = tree[level1Title][level2Title];

        for (var level3Title in level2Tree) {
            if (level2Tree.hasOwnProperty(level3Title)) {
                (function () {
                    var mdFile = level2Tree[level3Title];

                    var level3Element = level3LiTemplate.clone();

                    level3Element.find('.level-3-title').text(level3Title).attr('data-title', level3Title);

                    var level = new Level(level3Title, 3);
                    level.subLevelContainerElement = level3Element.find('.level-4-ul');

                    parentLevel.subLevels.push(level);
                })();
            }
        }
    }

    function buildLevel4List(level1Title, level2Title, level3Title) {
        var level4LiTemplate = $('#html-templates .level-4-li-template').clone();
        var level4TitleTemplate = $('#html-templates .level-4-title-template').clone();

        var ajaxCallsComplete = 0;
        var asyncDone = false;
        var mdHtml;

        var parentLevel = baseLevel
            .find(level1Title)
            .find(level2Title)
            .find(level3Title);

        var mdFile = tree[level1Title][level2Title][level3Title];

        console.log(mdFile);
        console.log(parentLevel);

        $.ajax({
            type: 'GET', url: 'pages/' + mdFile,
            success: function (html) {
                mdHtml = converter.makeHtml(html);

                if (mdHtml ===
                    undefined ||
                    mdHtml ===
                    'undefined' ||
                    typeof mdHtml !==
                    'string') {
                    return;
                }

                var mdElement = $('<div>' + mdHtml + '</div>');

                mdElement.find('h1').each(function (index, h1Element) {
                    var level4Element = level4LiTemplate.clone();
                    var level4TitleElement = level4TitleTemplate.clone();
                    var level4Title = $(h1Element).text();

                    level4TitleElement.text($(h1Element).text())
                        .attr('data-title', $(h1Element).text());

                    parentLevel.subLevelContainerElement.append(level4TitleElement);
                    level3Element.find('.level-4-ul').append(level4Element);
                });

                ajaxCallsComplete++;

                if (ajaxCallsComplete === Object.keys(tree).length) {
                    asyncDone = true;
                }
            }
        });

        (function () {
            var interval = setInterval(function () {
                if (asyncDone) {
                    $('#level-2-ul').show();

                    var htmlString = '<div class="md-file-contents">' + mdsHtml + '</div>';

                    $('.content-container', frames['md-iframe'].document).append($(htmlString));

                    document.getElementById('md-iframe')
                        .contentWindow
                        .Prism
                        .highlightAll(true, function () {
                        });

                    setupLevel2ClickEvents();

                    clearInterval(interval);
                }
            }, 10);
        })();
    }

    function render(level1Name, level2Name, level3name, level4TitleName) {
        if (level2Name === undefined) {

        }
    }

    function setupLevel1ClickEvents() {
        $('.level-1-title-template').click(function (event) {
            event.stopPropagation();
            event.preventDefault();

            $('#level-2-ul').empty();

            buildLevel2Tree(level2Tree[$(this).text()]);

            return false;
        });
    }

    function setupLevel2ClickEvents() {
        console.log(contentTree);

        $('.level-2-title-template').click(function (event) {
            event.stopPropagation();
            event.preventDefault();

            $('#level-2-ul').empty();

            buildLevel2Tree(level2Tree[$(this).text()]);

            return false;
        });
    }

    var iframe = $('#md-iframe');

    setInterval(function (event) {
        if (iframe.length === 0) {
            return;
        }

        iframe.height($(window).height() - iframe.offset().top - 10);

    }, 50);

    var mdContainer = $('.md-container');

    $('.md-link').click(function () {
        var file = $(this).data('file');

        var paramString = $.param({'current-md': file});

        if (history.pushState) {
            var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

            window.history.pushState({path: currentUrl + "?" + paramString}, '', currentUrl +
                "?" +
                paramString);
        }

        mdContainer.fadeOut(60, function () {
            $.ajax({
                type: 'GET', url: 'pages/' + file, success: function (html) {
                    mdContainer.html(converter.makeHtml(html));

                    Prism.highlightAll(true, function () {
                    });

                    $("html, body").animate({scrollTop: 0}, 150);

                    mdContainer.fadeIn(60);
                }
            });
        });

        $('.md-link').removeClass('active');
        $(this).addClass('active');
    });

    if (getParameterByName('current-md') != null) {
        $('.md-link[data-file="' + getParameterByName('current-md') + '"]').trigger('click');
    } else {
        $('.md-link').first().trigger('click');
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});