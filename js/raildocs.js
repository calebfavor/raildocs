$(function () {

    /* Info Architecture

     --- level 1 (tabs)
     ------ level 2 (category, collection of md files) (this is a single content panel)
     --------- level 3 (sub category, 1 md file)
     ------------ level 4 (md file h1's)

     */

    var masterTree = {
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

    function TabLevel1(title, tree) {
        var self = this;
        var element = undefined;
        var lists = [];
        var parentElement = $('#level-1-ul');
        var listsContainerElement = $('#level-2-ul');

        this.render = function () {
            parentElement.append(this.getElement());
        };

        this.renderLists = function () {
            listsContainerElement.empty();

            var lists = self.getLists();

            for (var listIndex in lists) {
                if (lists.hasOwnProperty(listIndex)) {
                    lists[listIndex].render();
                }
            }
        };

        this.buildLists = function () {
            lists = [];

            for (var subTitle in tree) {
                if (tree.hasOwnProperty(subTitle)) {

                    var list = new ListLevel2(subTitle, listsContainerElement, tree[subTitle]);

                    self.addList(list);
                }
            }
        };

        this.getElement = function () {
            if (element === undefined) {
                element = $('#html-templates .tab-level-template').clone();
            }

            element.find('.tab-level-title').text(title).attr('data-title', title);

            element.click(this.onClick);

            return element;
        };

        this.getTitle = function () {
            return title;
        };

        this.getLists = function () {
            return lists;
        };

        this.addList = function (list) {
            lists.push(list)
        };

        this.onClick = function (event) {
            event.stopPropagation();
            event.preventDefault();

            $('.tab-level-title').removeClass('active');

            self.getElement().find('.tab-level-title').addClass('active');

            self.buildLists();
            self.renderLists();
        };
    }

    function TabDivider() {
        var element = undefined;
        var parentElement = $('#level-1-ul');

        this.render = function () {
            parentElement.append(this.getElement());
        };

        this.getElement = function () {
            if (element === undefined) {
                element = $('#html-templates .li-divider-template').clone();
            }

            return element;
        };
    }

    function ListLevel2(title, containerElement, tree) {
        var self = this;

        var element = $('#html-templates .list-level-template').clone();
        var subLists = [];

        this.mdHtml = '';

        this.buildSubLists = function () {
            subLists = [];

            for (var subTitle in tree) {
                if (tree.hasOwnProperty(subTitle)) {

                    console.log(subTitle);

                    var list = new ListLevel3(subTitle,
                        self.getElement().find('.list-level-ul'),
                        tree[subTitle]);

                    self.addSubList(list);
                }
            }
        };

        this.renderSubLists = function () {
            // containerElement.empty();

            var lists = self.getSubLists();

            for (var listIndex in lists) {
                if (lists.hasOwnProperty(listIndex)) {
                    lists[listIndex].render();
                }
            }
        };

        this.findSubList = function (title) {
            var levelToReturn = undefined;

            this.subLevels.forEach(function (level) {
                if (level.getTitle() === title) {
                    levelToReturn = level;
                }
            });

            return levelToReturn;
        };

        this.getElement = function () {
            if (element === undefined) {
                element = $('#html-templates .list-level-template').clone();
            }

            element.find('.list-level-title').text(title).attr('data-title', title);

            return element;
        };

        this.getTitle = function () {
            return title;
        };

        this.getSubLists = function () {
            return subLists;
        };

        this.addSubList = function (list) {
            subLists.push(list)
        };

        this.render = function () {
            containerElement.append(self.getElement());

            self.buildSubLists();
            self.renderSubLists();
        }
    }

    function ListLevel3(title, containerElement, mdFile) {
        var self = this;
        var element;

        this.getElement = function () {
            if (element === undefined) {
                element = $('#html-templates .list-level-template').clone();
            }

            element.find('.list-level-title').text(title).attr('data-title', title);

            return element;
        };

        this.getTitle = function () {
            return title;
        };

        this.render = function () {
            containerElement.append(self.getElement());

            $.ajax({
                type: 'GET', url: 'pages/' + mdFile,
                success: function (html) {
                    var mdHtml = converter.makeHtml(html);

                    console.log(mdFile);

                    mdHtml += mdHtml;

                    var mdElement = $('<div>' + mdHtml + '</div>');

                    mdElement.find('h1').each(function (index, h1Element) {

                        // Level 4
                        var level4Title = $(h1Element).text();
                        var titleLevel4 = new TitleLevel4(
                            level4Title,
                            self.getElement().find('.list-level-ul')
                        );

                        titleLevel4.render();
                    });

                    currentAjaxCount--;
                }
            });
        }
    }

    function TitleLevel4(title, containerElement) {
        var self = this;
        var element = $('#html-templates .level-4-li-template').clone();

        this.render = function() {
            element.find('.level-4-title-template').text(title).data('title', title);

            containerElement.append(element);
        };
    }

    var tabs = [];
    var currentPosition = [];
    var currentAjaxCount = 0;

    var converter = new showdown.Converter();
    converter.setFlavor('github');

    buildTabMenu();

    $('.tab-level-title-template').click(function (event) {
        event.stopPropagation();
        event.preventDefault();

        $('.level-1-title-template').removeClass('active');
        $(this).addClass('active');

        render($(this).data('title'));

        return false;
    });

    $('body').on('click', '.level-2-title', function (event) {
        event.stopPropagation();
        event.preventDefault();

        $('.level-2-title').removeClass('active');
        $(this).addClass('active');

        currentPosition[1] = $(this).data('title');

        render(currentPosition[0], currentPosition[1]);

        return false;
    });

    $('body').on('click', '.level-3-title', function (event) {
        event.stopPropagation();
        event.preventDefault();

        currentPosition[1] = $(this).closest('.level-2-li-template').find('.level-2-title').data('title');
        currentPosition[2] = $(this).data('title');

        render(currentPosition[0], currentPosition[1], currentPosition[2]);

        // setTimeout(function () {
        //     $('.level-3-title').removeClass('active');
        //     $(this_).addClass('active')
        //         .parent()
        //         .find('.collapse-button')
        //         .trigger('click');
        //
        //     var index = $(this_).parent().parent().find('.level-3-title').index(this);
        //
        //     var newPosition = $('body', frames['md-iframe'].document)
        //         .find('.level-3-splitter-template')
        //         .eq(index)
        //         .offset().top;
        //
        //     $('body', frames['md-iframe'].document).scrollTop(newPosition);
        // }, 100);

        return false;
    });

    $('body').on('click', '.level-4-title-template', function (event) {
        event.stopPropagation();
        event.preventDefault();

        currentPosition[1] = $(this).closest('.level-2-li-template').find('.level-2-title').data('title');
        currentPosition[2] = $(this).closest('.level-3-li-template').find('.level-3-title').data('title');
        currentPosition[3] = $(this).data('title');

        render(currentPosition[0], currentPosition[1], currentPosition[2], currentPosition[3]);

        // if (currentPosition[1] !== $('.level-2-title.active').data('title')) {
        //     $('.level-2-title[data-title="' + currentPosition[1] + '"]').trigger('click');
        // }
        //
        // setTimeout(function () {
        //     $('.level-4-title-template').removeClass('active');
        //     $(this_).addClass('active');
        //
        //     var index = $(this_)
        //         .parent()
        //         .parent()
        //         .parent()
        //         .parent()
        //         .find('.level-4-title-template')
        //         .index(this_);
        //
        //     console.log(index);
        //
        //     var newPosition = $('body', frames['md-iframe'].document)
        //         .find('h1')
        //         .eq(index)
        //         .offset().top;
        //
        //     $('body', frames['md-iframe'].document).scrollTop(newPosition);
        // }, 100);

        return false;
    });

    $('body').on('click', '.collapse-button', function (event) {
        event.stopPropagation();
        event.preventDefault();

        var listElement = $(this).parent().find('ul');

        if (listElement.is(':visible') && !$(this).parent().find('.level-title').hasClass('active')) {
            listElement.hide();
            $(this).text('+');
        } else {
            listElement.show();
            $(this).text('-');
        }
    });

    function buildTabMenu() {
        for (var title in masterTree) {
            if (masterTree.hasOwnProperty(title)) {

                if (title.slice(0, 8) === 'splitter') {
                    new TabDivider().render();
                } else {
                    var tab = new TabLevel1(title, masterTree[title]);

                    tabs.push(tab);

                    tab.render();
                }

            }
        }
    }

    function buildLevel2List(tabTitle) {
        for (var tab in tabs) {
            if (tab.getTitle() === tabTitle) {
                break;
            }
        }

        var level2Ul = $('#level-2-ul');

        var level1Tree = tree[tab.getTitle()];

        for (var level2Title in level1Tree) {
            if (level1Tree.hasOwnProperty(level2Title)) {

                var list = new List(level2Title);

                level2Ul.append(list.getElement());

                tab.addList(list);
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
                level.listContainerElement = level3Element;

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

    function render(level1Title, level2Title, level3Title, level4Title) {
        currentAjaxCount = 0;

        if (level1Title !== currentPosition[0]) {
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

        if (level1Title !== currentPosition[0] || level2Title !== currentPosition[1]) {
            baseLevel.find(currentPosition[0]).find(currentPosition[1]).listContainerElement
        }

        currentPosition[1] = level2Title;

        // var interval = setInterval(function () {
        //     if (currentAjaxCount === 0) {
        //         clearInterval(interval);
        //
        //         var mdsHtml = '';
        //         var levelsToRender = baseLevel.find(level1Title).find(level2Title).subLevels;
        //
        //         console.log('hit!');
        //
        //         $(baseLevel.find(level1Title).find(level2Title).subLevelContainerElement)
        //             .parent()
        //             .find('.collapse-button')
        //             .trigger('click');
        //
        //         $(baseLevel.find(level1Title).find(level2Title).subLevelContainerElement)
        //             .parent().find('.level-title').first().addClass('active');
        //
        //         // collect all the md html
        //         for (var level in levelsToRender) {
        //             var splitter = $('#html-templates .level-3-splitter-template').clone();
        //             console.log(splitter);
        //             splitter.attr('data-title', levelsToRender[level].title)
        //                 .text(levelsToRender[level].title);
        //
        //             mdsHtml += splitter[0].outerHTML + levelsToRender[level].mdHtml;
        //         }
        //
        //         var htmlString = '<div>' + mdsHtml + '</div>';
        //
        //         $('.content-container', frames['md-iframe'].document).empty().append($(htmlString));
        //
        //         document.getElementById('md-iframe')
        //             .contentWindow
        //             .Prism
        //             .highlightAll(true, function () {
        //             });
        //
        //         console.log(currentPosition);
        //     }
        // }, 50);
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