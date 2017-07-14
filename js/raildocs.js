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
        this.mdHtml = '';
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
    var currentPosition = [];
    var currentAjaxCount = 0;

    var converter = new showdown.Converter();
    converter.setFlavor('github');

    buildLevel1List();

    $('.level-1-title-template').click(function (event) {
        event.stopPropagation();
        event.preventDefault();

        $('.level-1-title-template').removeClass('active');
        $(this).addClass('active');

        currentPosition[0] = $(this).data('title');
        currentPosition[1] = undefined;
        render();

        return false;
    });

    $('body').on('click', '.level-2-title', function (event) {
        event.stopPropagation();
        event.preventDefault();

        $('.level-2-title').removeClass('active');
        $(this).addClass('active');

        currentPosition[1] = $(this).data('title');
        currentPosition[2] = undefined;

        render();

        return false;
    });

    $('body').on('click', '.level-3-title', function (event) {
        event.stopPropagation();
        event.preventDefault();

        currentPosition[2] = $(this).data('title');
        currentPosition[3] = undefined;

        $('.level-3-title').removeClass('active');
        $(this).addClass('active')
            .parent()
            .find('.collapse-button')
            .trigger('click');

        var index = $(this).parent().parent().find('.level-3-title').index(this);

        console.log(index);

        var newPosition = $('body', frames['md-iframe'].document)
            .find('.level-3-splitter-template')
            .eq(index)
            .offset().top;

        $('body', frames['md-iframe'].document).scrollTop(newPosition);

        return false;
    });

    $('body').on('click', '.level-4-title-template', function (event) {
        event.stopPropagation();
        event.preventDefault();

        currentPosition[3] = $(this).data('title');

        $('.level-4-title-template').removeClass('active');
        $(this).addClass('active');

        var index = $(this).parent().parent().parent().parent().find('.level-4-title-template').index(this);

        console.log(index);

        var newPosition = $('body', frames['md-iframe'].document)
            .find('h1')
            .eq(index)
            .offset().top;

        $('body', frames['md-iframe'].document).scrollTop(newPosition);

        return false;
    });

    $('body').on('click', '.collapse-button', function (event) {
        event.stopPropagation();
        event.preventDefault();

        var listElement = $(this).parent().find('ul');

        if (listElement.is(':visible')) {
            listElement.hide();
            $(this).text('+');
        } else {
            listElement.show();
            $(this).text('-');
        }
    });

    function buildLevel1List() {
        var level1Ul = $('#level-1-ul');
        var level1LiTemplate = $('#html-templates .level-1-li-template').clone();
        var liDividerTemplate = $('#html-templates .li-divider-template').clone();

        for (var level1Title in tree) {
            if (tree.hasOwnProperty(level1Title)) {

                // Level 1
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

                // Level 2
                var level2Element;

                level2Element = level2LiTemplate.clone();
                level2Element.find('.level-2-title').text(level2Title).attr('data-title', level2Title);

                level2Ul.append(level2Element);

                var level = new Level(level2Title, 2);
                level.subLevelContainerElement = level2Element.find('.level-3-ul');

                baseLevel.find(level1Title).subLevels.push(level);

            }
        }
    }

    function buildLevel3List(level1Title, level2Title) {
        var level3LiTemplate = $('#html-templates .level-3-li-template').clone();

        var parentLevel = baseLevel
            .find(level1Title)
            .find(level2Title);

        var level2Tree = tree[level1Title][level2Title];

        for (var level3Title in level2Tree) {
            if (level2Tree.hasOwnProperty(level3Title)) {

                // Level 3
                var level3Element = level3LiTemplate.clone();

                level3Element.find('.level-3-title').text(level3Title).attr('data-title', level3Title);

                parentLevel.subLevelContainerElement.append(level3Element);

                var level = new Level(level3Title, 3);
                level.subLevelContainerElement = level3Element.find('.level-4-ul');

                parentLevel.subLevels.push(level);
            }
        }
    }

    function buildLevel4List(level1Title, level2Title, level3Title, async) {
        if (async === undefined) {
            async = false;
        }

        var level4LiTemplate = $('#html-templates .level-4-li-template').clone();
        var level4TitleTemplate = $('#html-templates .level-4-title-template').clone();

        var parentLevel = baseLevel
            .find(level1Title)
            .find(level2Title)
            .find(level3Title);

        var mdFile = tree[level1Title][level2Title][level3Title];

        currentAjaxCount++;

        $.ajax({
            type: 'GET', url: 'pages/' + mdFile,
            async: async,
            success: function (html) {
                var mdHtml = converter.makeHtml(html);

                parentLevel.mdHtml += mdHtml;

                var mdElement = $('<div>' + mdHtml + '</div>');

                mdElement.find('h1').each(function (index, h1Element) {

                    // Level 4
                    var level4Element = level4LiTemplate.clone();
                    var level4TitleElement = level4TitleTemplate.clone();
                    var level4Title = $(h1Element).text();

                    level4TitleElement.text(level4Title)
                        .attr('data-title', level4Title);
                    level4Element.append(level4TitleElement);

                    parentLevel.subLevelContainerElement.append(level4Element);

                    var level = new Level(level4Title, 4);

                    parentLevel.subLevels.push(level);
                });

                currentAjaxCount--;
            }
        });
    }

    function render() {
        currentAjaxCount = 0;

        var level1Title = currentPosition[0];
        var level2Title = currentPosition[1];
        var level3Title = currentPosition[2];
        var level4Title = currentPosition[3];

        if (level2Title === undefined) {
            $('#level-2-ul').empty();

            buildLevel2List(level1Title);

            for (level2Title in tree[level1Title]) {
                buildLevel3List(level1Title, level2Title);

                for (level3Title in tree[level1Title][level2Title]) {
                    buildLevel4List(level1Title, level2Title, level3Title, true);
                }
            }

            // render first by default
            level2Title = Object.keys(tree[level1Title])[0];
        }

        currentPosition[1] = level2Title;

        var interval = setInterval(function () {
            if (currentAjaxCount === 0) {
                clearInterval(interval);

                var mdsHtml = '';
                var levelsToRender = baseLevel.find(level1Title).find(level2Title).subLevels;

                console.log('hit!');

                $(baseLevel.find(level1Title).find(level2Title).subLevelContainerElement)
                    .parent()
                    .find('.collapse-button')
                    .trigger('click');

                $(baseLevel.find(level1Title).find(level2Title).subLevelContainerElement)
                    .parent().find('.level-title').first().addClass('active');

                // collect all the md html
                for (var level in levelsToRender) {
                    var splitter = $('#html-templates .level-3-splitter-template').clone();
                    console.log(splitter);
                    splitter.attr('data-title', levelsToRender[level].title)
                        .text(levelsToRender[level].title);

                    mdsHtml += splitter[0].outerHTML + levelsToRender[level].mdHtml;
                }

                var htmlString = '<div>' + mdsHtml + '</div>';

                $('.content-container', frames['md-iframe'].document).empty().append($(htmlString));

                document.getElementById('md-iframe')
                    .contentWindow
                    .Prism
                    .highlightAll(true, function () {
                    });

                console.log(currentPosition);
            }
        }, 50);
    }

    var iFrame = $('#md-iframe');

    setInterval(function (event) {
        if (iFrame.length === 0) {
            return;
        }

        iFrame.height($(window).height() - iFrame.offset().top - 10);

    }, 50);

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