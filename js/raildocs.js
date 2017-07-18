$(function () {
    var Tab = function (title, primaryCategories) {
        var self = this;
        var element = $('#html-templates .tab-level-template').clone();
        var titleElement = element.find('.tab-level-title').first();

        var childrenContainerElement = $('#level-2-ul');

        this.render = function () {
            titleElement.text(title).attr('data-title', title);

            $('#level-1-ul').append(element);
        };

        this.onClick = function (event) {
            event.preventDefault();
            event.stopPropagation();

            childrenContainerElement.empty();

            // render primary categories
            for (var primaryCategoryIndex in primaryCategories) {
                if (primaryCategories.hasOwnProperty(primaryCategoryIndex)) {
                    var primaryCategory = primaryCategories[primaryCategoryIndex];

                    primaryCategory.render(childrenContainerElement);
                }
            }

            currentTab = self;

            if (currentPrimaryCategory === undefined) {
                primaryCategories[0].select();
            } else {
                currentPrimaryCategory.select();
            }

            $('.tab-level-title').removeClass('active');
            titleElement.addClass('active');
        };

        // setup events
        element.click(self.onClick);
    };

    var PrimaryCategory = function (title, subCategories) {
        var self = this;
        var element = $('#html-templates .primary-category-list-template').clone();
        var titleElement = element.find('.primary-category-list-title').first();
        var childrenContainerElement = element.find('.primary-category-list-ul').first();

        this.render = function (containerElement) {
            titleElement.text(title).attr('data-title', title);

            containerElement.append(element);

            childrenContainerElement.children().detach();

            // render sub categories
            for (var subCategoryIndex in subCategories) {
                if (subCategories.hasOwnProperty(subCategoryIndex)) {
                    var subCategory = subCategories[subCategoryIndex];

                    subCategory.render(childrenContainerElement);
                }
            }
        };

        this.displayMarkdown = function () {
            var mdHtml = '';

            for (var subCategoryIndex in subCategories) {
                if (subCategories.hasOwnProperty(subCategoryIndex)) {
                    var subCategory = subCategories[subCategoryIndex];

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

            currentPrimaryCategory = self;

            if (currentSubCategory === undefined) {
                subCategories[0].select();
            }
        };

        this.onClick = function (event) {
            console.log('hit2');

            event.stopPropagation();
            self.select();



        };

        element.click(self.onClick);
    };

    var SubCategory = function (title, mdFile) {
        var self = this;
        var element = $('#html-templates .sub-category-list-template').clone();
        var titleElement = element.find('.sub-category-list-title').first();
        var childrenContainerElement = element.find('.sub-category-list-ul').first();

        var converter = new showdown.Converter();
        converter.setFlavor('github');

        this.combinedMarkdownHtml = '';

        this.render = function (containerElement) {
            element.find('.sub-category-list-title').text(title).attr('data-title', title);

            containerElement.append(element);

            childrenContainerElement.children().detach();

            this.combinedMarkdownHtml = '';

            $.ajax({
                type: 'GET', url: 'pages/' + mdFile,
                async: false,
                success: function (html) {
                    var mdHtml = converter.makeHtml(html);
                    var mdElement = $('<div>' + mdHtml + '</div>');

                    self.combinedMarkdownHtml += mdHtml;

                    // render headers
                    mdElement.find('h1').each(function (index, h1Element) {
                        var headerTitle = $(h1Element).text();
                        var header = new Header(headerTitle);

                        header.render(childrenContainerElement);
                    });
                }
            });
        };

        this.select = function () {
            childrenContainerElement.show();

            $('.sub-category-list-title').removeClass('active');
            titleElement.addClass('active');

            currentSubCategory = self;
        };

        this.onClick = function (event) {
            console.log('hit1');
            self.select();
        };

        element.click(self.onClick);
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

    var masterTree = [
        new Tab('Documentation', [
            new PrimaryCategory('Guidelines', [
                new SubCategory('Rules & Formatting', 'rules-and-guidelines.md'),
                new SubCategory('Syntax Reference', 'syntax.md'),
                new SubCategory('How To Create New Pages & Categories', 'creating-new-pages.md'),
                new SubCategory('Pushing Changes', 'pushing-changes.md'),
            ]),
        ]),
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
    ];

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

    // setup iFrame auto resizing
    setInterval(function (event) {
        var iFrame = $('#md-iframe');

        if (iFrame.length === 0) {
            return;
        }

        iFrame.height($(window).height() - iFrame.offset().top - 10);

    }, 50);
});