$(function () {
    /*
     Define Objects
     */
    var Tab = function (title, primaryCategories) {
        var self = this;
        var element = $('#html-templates .tab-level-template').clone();
        var titleElement = element.find('.tab-level-title').first();
        var childrenContainerElement = $('#primary-category-ul');

        this.render = function () {
            // set the title and add the element to the page
            titleElement.text(title).attr('data-title', title);
            $('#tab-ul').append(element);

            // setup events
            element.unbind('click.raildocs');
            element.on('click.raildocs', self.onClick);
        };

        this.onClick = function (event) {
            currentTab = self;

            if ($(event.target).hasClass('tab-level-title')) {
                currentPrimaryCategory = undefined;
                currentSubCategory = undefined;
                currentHeader = undefined;
            }

            self.select();
        };

        this.select = function () {
            $('.tab-level-title').removeClass('active');
            titleElement.addClass('active');

            // load in primary categories
            childrenContainerElement.empty();

            for (var primaryCategoryIndex in primaryCategories) {
                if (primaryCategories.hasOwnProperty(primaryCategoryIndex)) {
                    var primaryCategory = primaryCategories[primaryCategoryIndex];

                    primaryCategory.render(childrenContainerElement);
                }
            }

            if (currentPrimaryCategory === undefined) {
                primaryCategories[0].select();
            } else {
                currentPrimaryCategory.select();
            }
        };
    };

    var PrimaryCategory = function (title, subCategories) {
        var self = this;
        var element = $('#html-templates .primary-category-list-template').clone();
        var titleElement = element.find('.primary-category-list-title').first();
        var childrenContainerElement = element.find('.primary-category-list-ul').first();

        this.render = function (containerElement) {
            titleElement.text(title).attr('data-title', title);
            containerElement.append(element);

            element.unbind('click.raildocs');
            element.on('click.raildocs', self.onClick);

            // empty and insert new sub categories
            childrenContainerElement.find('.sub-category-list-template').detach();

            for (var subCategoryIndex in subCategories) {
                if (subCategories.hasOwnProperty(subCategoryIndex)) {
                    var subCategory = subCategories[subCategoryIndex];

                    subCategory.render(childrenContainerElement);
                }
            }
        };

        this.displayMarkdown = function () {
            // insert the actual markdown content in to the pages iFrame
            var mdHtml = '';
            var mdSplitterElement = $('#html-templates .sub-category-splitter').clone();

            for (var subCategoryIndex in subCategories) {
                if (subCategories.hasOwnProperty(subCategoryIndex)) {
                    var subCategory = subCategories[subCategoryIndex];

                    mdHtml += mdSplitterElement[0].outerHTML;
                    mdHtml += subCategory.combinedMarkdownHtml;
                }
            }

            $('.content-container', frames['md-iframe'].document).empty().append($(mdHtml));
        };

        this.select = function () {
            childrenContainerElement.show();

            $('.primary-category-list-title').removeClass('active');
            titleElement.addClass('active');

            self.displayMarkdown();

            if (currentSubCategory === undefined) {
                subCategories[0].select();
            } else {
                currentSubCategory.select();
            }
        };

        this.onClick = function (event) {
            currentPrimaryCategory = self;

            if ($(event.target).hasClass('primary-category-list-title')) {
                currentHeader = undefined;
                currentSubCategory = undefined;
            }

            currentPrimaryCategory.select();

            if (currentSubCategory === undefined) {
                subCategories[0].select();
            } else {
                currentSubCategory.select();
            }
        };

    };

    var SubCategory = function (title, mdFile) {
        var self = this;
        var element = $('#html-templates .sub-category-list-template').clone();
        var titleElement = element.find('.sub-category-list-title').first();
        var childrenContainerElement = element.find('.sub-category-list-ul').first();
        var headers = [];

        var converter = new showdown.Converter();
        converter.setFlavor('github');

        this.combinedMarkdownHtml = '';

        this.render = function (containerElement) {
            element.find('.sub-category-list-title').text(title).attr('data-title', title);

            containerElement.append(element);

            element.unbind('click.raildocs');
            element.on('click.raildocs', self.onClick);

            childrenContainerElement.children().detach();

            this.combinedMarkdownHtml = '';
            headers = [];

            $.ajax({
                type: 'GET', url: 'pages/' + mdFile,
                async: false,
                success: function (html) {
                    ajaxCount--;

                    var mdHtml = converter.makeHtml(html);
                    var mdElement = $('<div>' + mdHtml + '</div>');

                    self.combinedMarkdownHtml += mdHtml;

                    // render headers
                    mdElement.find('h1').each(function (index, h1Element) {
                        var headerTitle = $(h1Element).text();
                        var header = new Header(headerTitle);

                        header.render(childrenContainerElement);

                        headers.push(header);
                    });
                }
            });

            ajaxCount++;
        };

        this.select = function () {
            $('.sub-category-list-title').removeClass('active');
            titleElement.addClass('active');

            childrenContainerElement.show();

            var interval = setInterval(function () {
                if (ajaxCount === 0) {
                    var index = element
                        .closest('.primary-category-list-template')
                        .find('.sub-category-list-template')
                        .index(element);

                    var newPosition = $('body', frames['md-iframe'].document)
                        .find('.sub-category-splitter')
                        .eq(index)
                        .offset().top;

                    $('body', frames['md-iframe'].document).scrollTop(newPosition);

                    if (currentHeader === undefined) {
                        headers[0].select();
                    } else {
                        currentHeader.select();
                    }

                    clearInterval(interval);
                }
            }, 50);
        };

        this.onClick = function (event) {
            currentSubCategory = self;

            if ($(event.target).hasClass('sub-category-list-title')) {
                currentHeader = undefined;
            }
        };
    };

    var Header = function (title) {
        var self = this;
        var element = $('#html-templates .title-list-template').clone();
        var titleElement = element.find('.title-list-title').first();

        this.render = function (containerElement) {
            element.find('.title-list-title').text(title).data('title', title);

            containerElement.append(element);
        };

        this.onClick = function (event) {
            currentHeader = self;
        };

        this.select = function () {
            var index = element
                .closest('.primary-category-list-template')
                .find('.title-list-template')
                .index(element);
            var newPosition = $('body', frames['md-iframe'].document)
                .find('h1')
                .eq(index)
                .offset().top;

            $('body', frames['md-iframe'].document).scrollTop(newPosition);

            $('.title-list-title').removeClass('active');
            titleElement.addClass('active');
        };

        element.click(self.onClick);
    };

    var TabSplitter = function () {
        this.render = function () {
            $('#tab-ul').append($('#html-templates .tab-divider-template').clone());
        }
    };

    /*
     Master Tree
     */
    var masterTree = [
        new Tab('Documentation', [
            new PrimaryCategory('Guidelines', [
                new SubCategory('Rules & Formatting', 'rules-and-guidelines.md'),
                new SubCategory('Syntax Reference', 'syntax.md'),
                new SubCategory('How To Create New Pages & Categories', 'creating-new-pages.md'),
                new SubCategory('Pushing Changes', 'pushing-changes.md'),
            ]),
        ]),
        new TabSplitter(),
        new Tab('Environments, Deployment, & Sysops', [
            new PrimaryCategory('Local Development Environments', [
                new SubCategory('Getting Started / Pre Setup', 'getting-started.md'),
                new SubCategory('Drumeo Setup', 'drumeo.md'),
                new SubCategory('Pianote Setup', 'pianote.md'),
                new SubCategory('Guitar Lessons Setup', 'guitarlessons.md'),
                new SubCategory('Static/Misc Sites Setup', 'misc-sites.md'),
                new SubCategory('Helper Links & Commands', 'helper-links-and-commands.md'),
                new SubCategory('Pulling Production Databases', 'pulling-production-databases.md'),
                new SubCategory('PHPStorm Debugging & PHPUnit', 'php-debugging.md'),
            ]),
            new PrimaryCategory('How To Deploy', [
                new SubCategory('Drumeo', 'deploying-drumeo.md'),
                new SubCategory('Drumeo Forums', 'deploying-drumeo-forums.md'),
                new SubCategory('Pianote', 'deploying-pianote.md'),
                new SubCategory('Misc Sites', 'deploying-misc-sites.md'),
            ]),
            new PrimaryCategory('Production Emergency Procedure', [
                new SubCategory('Drumeo Production Server Procedure', 'production-server-down.md'),
                new SubCategory('Infusionsoft API Down/Offline Procedure', 'infusionsoft-api-down.md'),
            ]),
            new PrimaryCategory('Sysops Guides', [
                new SubCategory('Creating A Kubernetes Cluster', 'creating-a-new-kubernetes-cluster.md'),
                new SubCategory('Connecting To Kubernetes Cluster',
                    'connecting-to-existing-kubernetes-cluster.md'),
                new SubCategory('Using Our ELK Stack', 'elk-stack.md'),
                new SubCategory('Setting Up A AWS VPC', 'setting-up-a-aws-vpc.md'),
                new SubCategory('AWS EBS Cron Jobs', 'aws-ebs-cron-jobs.md'),
            ]),
            new PrimaryCategory('PHPStorm Guides & Reference', [
                new SubCategory('Advanced Find & Replace', 'find-and-replace.md'),
            ]),
        ]),
        new Tab('Programming', [
            new PrimaryCategory('Tutorials', [
                new SubCategory('Package Development Workflow', 'package-development-workflow.md'),
            ]),
            new PrimaryCategory('Management', [
                new SubCategory('Updating Drumeo Wordpress', 'updating-wordpress.md'),
            ]),
        ]),
        new Tab('Front End', []),
        new Tab('Misc Dev', []),
        new TabSplitter(),
        new Tab('Support', []),
        new Tab('Accounting', []),

    ];

    /*
     App Entry Point
     */
    var ajaxCount = 0;

    var currentTab;
    var currentPrimaryCategory;
    var currentSubCategory;
    var currentHeader;

    // render main tabs
    for (var tabIndex in masterTree) {
        if (masterTree.hasOwnProperty(tabIndex)) {
            var tab = masterTree[tabIndex];

            tab.render();
        }
    }

    $('iframe').on('load', function () {
        $('.tab-level-title').first().trigger('click.raildocs');
    });

    // setup iFrame auto resizing
    setInterval(function (event) {
        var iFrame = $('#md-iframe');

        if (iFrame.length === 0) {
            return;
        }

        iFrame.height($(window).height() - iFrame.offset().top - 10);

    }, 50);
});